import express from 'express';
import cors from 'cors';
import path from 'path';
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the "public" and "out" directories
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/renders', express.static(path.join(__dirname, 'out')));

const compositionId = 'NewsVideo';
const entry = path.join(__dirname, 'src/index.ts');

app.post('/generate', async (req, res) => {
    const { headline, imageUrl } = req.body;

    if (!headline || !imageUrl) {
        return res.status(400).json({ error: 'Headline and imageUrl are required' });
    }

    const renderId = uuidv4();
    const outputLocation = path.join(__dirname, `out/${renderId}.mp4`);

    try {
        console.log(`🚀 Starting render for ${renderId}...`);

        // Bundle the project
        const bundled = await bundle({
            entryPoint: entry,
            // If you have a webpack override, add it here
        });

        // Select the composition
        const composition = await selectComposition({
            serveUrl: bundled,
            id: compositionId,
            inputProps: {
                headline,
                imageUrl,
            },
        });

        // Ensure output directory exists
        const outDir = path.dirname(outputLocation);
        if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir, { recursive: true });
        }

        // Render the video
        await renderMedia({
            composition,
            serveUrl: bundled,
            codec: 'h264',
            outputLocation,
            inputProps: {
                headline,
                imageUrl,
            },
        });

        const videoUrl = `${req.protocol}://${req.get('host')}/renders/${renderId}.mp4`;
        console.log(`✅ Render complete: ${videoUrl}`);

        res.json({
            success: true,
            renderId,
            url: videoUrl,
        });
    } catch (error) {
        console.error('❌ Render failed:', error);
        res.status(500).json({ error: 'Rendering failed', details: (error as Error).message });
    }
});

app.listen(port, () => {
    console.log(`\n📺 Video Generator API listening at http://localhost:${port}`);
    console.log(`   - POST /generate { "headline": "...", "imageUrl": "..." }`);
});

import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Headline: React.FC<{ text: string }> = ({ text }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrance = spring({
        frame: frame - 20,
        fps,
        config: {
            damping: 12,
        },
    });

    return (
        <div
            style={{
                transform: `scale(${entrance}) translateY(${(1 - entrance) * 50}px)`,
                opacity: entrance,
                color: 'white',
                fontSize: '56px',
                fontWeight: '900',
                textAlign: 'center',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                lineHeight: '1.1',
                textShadow: '2px 4px 8px rgba(0,0,0,0.8)',
                padding: '0 40px',
                maxWidth: '1000px',
                textTransform: 'uppercase',
            }}
        >
            {text}
        </div>
    );
};

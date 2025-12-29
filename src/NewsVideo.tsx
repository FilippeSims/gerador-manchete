import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, AbsoluteFill, Img, Audio, staticFile } from 'remotion';
import { Headline } from './components/Headline';
import { FollowButton } from './components/FollowButton';
import { FooterCTA } from './components/FooterCTA';
import { Badge } from './components/Badge';

export const NewsVideo: React.FC<{
	headline: string;
	imageUrl: string;
}> = ({ headline, imageUrl }) => {
	const frame = useCurrentFrame();
	useVideoConfig();

	const opacity = interpolate(frame, [0, 15], [0, 1]);

	// Zoom animation for background
	const bgZoom = interpolate(frame, [0, 450], [1, 1.2]);

	// Zoom-pan animation for main image
	const mainZoom = interpolate(frame, [0, 450], [1.1, 1.3]);
	const mainPanY = interpolate(frame, [0, 450], [-20, 20]);

	return (
		<AbsoluteFill style={{ backgroundColor: 'black' }}>
			<Audio src={staticFile('assets/audio.mp3')} />

			{/* Background with subtle zoom */}
			<AbsoluteFill style={{ opacity }}>
				<Img
					src={imageUrl}
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						filter: 'blur(30px) brightness(0.4)',
						transform: `scale(${bgZoom})`,
					}}
				/>
			</AbsoluteFill>

			{/* Main Content Area - Consolidated at Top */}
			<AbsoluteFill>
				{/* Top Section: All Text and Logo Content (Safe for TikTok UI) */}
				<div
					style={{
						height: '55%', // Increased to fit everything
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						padding: '60px 40px 20px',
						zIndex: 10,
						background: 'linear-gradient(rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 80%, transparent 100%)',
					}}
				>
					<div style={{ marginBottom: '20px' }}>
						<Badge />
					</div>

					<Headline text={headline} />

					<div style={{ marginTop: '30px' }}>
						<FollowButton />
					</div>

					{/* Footer CTA and Logo moved here */}
					<div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
						<FooterCTA />

						<div
							style={{
								marginTop: '20px',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<Img
								src={staticFile('assets/logo-aifeed.png')}
								style={{
									height: '60px',
									filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
								}}
							/>
						</div>
					</div>
				</div>

				{/* Bottom Section: Sharp Animated Image (Fills remaining space) */}
				<div
					style={{
						flex: 1,
						width: '100%',
						overflow: 'hidden',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						borderTop: '4px solid #2563eb',
						boxShadow: '0 -20px 40px rgba(0,0,0,0.5)',
					}}
				>
					<Img
						src={imageUrl}
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							transform: `scale(${mainZoom}) translateY(${mainPanY}px)`,
						}}
					/>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

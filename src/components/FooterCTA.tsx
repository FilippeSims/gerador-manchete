import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export const FooterCTA: React.FC = () => {
    const frame = useCurrentFrame();

    const opacity = interpolate(frame, [60, 90], [0, 0.8], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                opacity,
                color: 'white',
                fontSize: '28px',
                fontWeight: '500',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                textAlign: 'center',
            }}
        >
            Notícia completa no link da bio
        </div>
    );
};

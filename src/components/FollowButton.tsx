import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const FollowButton: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Pulse animation
    const pulse = Math.sin(frame / 10) * 0.05 + 1;

    const entrance = spring({
        frame: frame - 45,
        fps,
        config: {
            damping: 12,
        },
    });

    return (
        <div
            style={{
                transform: `scale(${entrance * pulse})`,
                opacity: entrance,
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '24px 48px',
                borderRadius: '50px',
                fontSize: '36px',
                fontWeight: '700',
                fontFamily: 'Inter, sans-serif',
                boxShadow: '0 20px 40px rgba(37, 99, 235, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            Siga para mais notícias
        </div>
    );
};

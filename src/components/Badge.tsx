import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Badge: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        frame: frame - 10,
        fps,
        config: {
            damping: 10,
        },
    });

    return (
        <div
            style={{
                transform: `scale(${scale})`,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: '#2563eb',
                padding: '8px 24px',
                borderRadius: '4px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            }}
        >
            <span style={{ fontSize: '32px' }}>🤖</span>
            <span
                style={{
                    color: 'white',
                    fontSize: '32px',
                    fontWeight: '900',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '2px',
                }}
            >
                INTELIGÊNCIA ARTIFICIAL
            </span>
        </div>
    );
};

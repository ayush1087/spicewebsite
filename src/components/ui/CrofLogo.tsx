import React from 'react';

interface CrofLogoProps {
  variant?: 'dark' | 'light' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const CrofLogo: React.FC<CrofLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showTagline = true,
  className = '',
  onClick
}) => {
  const textColor = variant === 'light' ? '#FFFFFF' : variant === 'gold' ? '#C9A227' : '#111111';
  const accentColor = '#C9A227';

  // Sizing scale
  const scale = size === 'sm' ? 0.65 : size === 'lg' ? 1.4 : size === 'xl' ? 2.0 : 1.0;

  const width = 220 * scale;
  const height = showTagline ? 75 * scale : 48 * scale;

  return (
    <div 
      className={`inline-flex flex-col items-center justify-center cursor-pointer select-none group transition-transform duration-300 ${className}`}
      onClick={onClick}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 260 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm transition-transform duration-300 group-hover:scale-[1.02]"
      >
        {/* Main Logo Text: C R [O-Botanical] F TM */}
        <g id="CROF-Wordmark">
          {/* C */}
          <path
            d="M 38 42 C 38 22 24 10 7 10 C 1 10 -4 12 -7 14 L -5 20 C -2 18 2 16 7 16 C 19 16 29 25 29 42 C 29 59 19 68 7 68 C 2 68 -2 66 -5 64 L -7 70 C -4 72 1 74 7 74 C 24 74 38 62 38 42 Z"
            fill={textColor}
            transform="translate(15, 0)"
          />

          {/* R */}
          <path
            d="M 60 11 L 60 73 L 69 73 L 69 47 L 85 47 L 96 73 L 106 73 L 94 45 C 102 43 107 37 107 28 C 107 17 99 11 85 11 Z M 69 19 L 84 19 C 93 19 98 22 98 28 C 98 34 93 39 84 39 L 69 39 Z"
            fill={textColor}
          />

          {/* Customized O with Gold Botanical Emblem Inside */}
          <g transform="translate(142, 42)">
            {/* Outer O ring */}
            <circle r="31" fill="none" stroke={textColor} strokeWidth="9" />
            
            {/* Inner Dark Background */}
            <circle r="26.5" fill="#111111" />

            {/* Golden Leaf / Grain Emblem inside O */}
            {/* Central Top Leaf */}
            <path
              d="M 0 -19 C 4 -12 4 -5 0 2 C -4 -5 -4 -12 0 -19 Z"
              fill={accentColor}
            />
            {/* Left Top Leaf */}
            <path
              d="M -2 -14 C -10 -15 -14 -8 -13 -1 C -7 -3 -2 -7 -2 -14 Z"
              fill={accentColor}
            />
            {/* Right Top Leaf */}
            <path
              d="M 2 -14 C 10 -15 14 -8 13 -1 C 7 -3 2 -7 2 -14 Z"
              fill={accentColor}
            />
            {/* Bottom Left Grain */}
            <path
              d="M -11 2 C -19 5 -18 14 -11 17 C -8 11 -7 5 -11 2 Z"
              fill={accentColor}
            />
            {/* Bottom Right Grain */}
            <path
              d="M 11 2 C 19 5 18 14 11 17 C 8 11 7 5 11 2 Z"
              fill={accentColor}
            />
            {/* Center Stem */}
            <path
              d="M 0 0 L 0 19"
              stroke={accentColor}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          {/* F */}
          <path
            d="M 188 11 L 188 73 L 197 73 L 197 45 L 222 45 L 222 37 L 197 37 L 197 19 L 226 19 L 226 11 Z"
            fill={textColor}
          />

          {/* Trademark TM */}
          <text
            x="229"
            y="18"
            fill={textColor}
            fontSize="10"
            fontWeight="bold"
            fontFamily="Inter, sans-serif"
          >
            TM
          </text>
        </g>

        {showTagline && (
          <>
            {/* Thin Gold Separator Line */}
            <line
              x1="10"
              y1="76"
              x2="245"
              y2="76"
              stroke={accentColor}
              strokeWidth="1.2"
              opacity="0.85"
            />

            {/* Sub-tagline: Pure Taste • Pure Aroma */}
            <text
              x="127.5"
              y="87"
              textAnchor="middle"
              fill={variant === 'light' ? '#E5E5E5' : '#333333'}
              fontSize="10.5"
              fontWeight="500"
              letterSpacing="2.2"
              fontFamily="Inter, sans-serif"
            >
              Pure Taste  •  Pure Aroma
            </text>
          </>
        )}
      </svg>
    </div>
  );
};

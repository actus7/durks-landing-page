import React from 'react';

interface DurksLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const DurksLogo: React.FC<DurksLogoProps> = ({
  className = "",
  width = 400,
  height = 240
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 240"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hexagonal Badge */}
      <g transform="translate(200, 60)">
        {/* Outer hexagon with rounded corners */}
        <path
          d="M-35,-60.6 L35,-60.6 L70,0 L35,60.6 L-35,60.6 L-70,0 Z"
          fill="white"
          stroke="none"
          rx="8"
        />

        {/* Inner hexagon background */}
        <path
          d="M-28,-48.5 L28,-48.5 L56,0 L28,48.5 L-28,48.5 L-56,0 Z"
          fill="#134e4a"
          stroke="none"
        />

        {/* Wheat/grain symbol */}
        <g transform="translate(0, -8)">
          {/* Central stem */}
          <rect x="-1.5" y="8" width="3" height="35" fill="white" rx="1.5" />

          {/* Top grain cluster */}
          <ellipse cx="0" cy="0" rx="4" ry="8" fill="white" />

          {/* Grain leaves - arranged more naturally */}
          <g>
            {/* Left side grains */}
            <ellipse cx="-12" cy="8" rx="8" ry="4" fill="white" transform="rotate(-25 -12 8)" />
            <ellipse cx="-14" cy="18" rx="9" ry="4.5" fill="white" transform="rotate(-15 -14 18)" />
            <ellipse cx="-12" cy="28" rx="8" ry="4" fill="white" transform="rotate(-5 -12 28)" />

            {/* Right side grains */}
            <ellipse cx="12" cy="8" rx="8" ry="4" fill="white" transform="rotate(25 12 8)" />
            <ellipse cx="14" cy="18" rx="9" ry="4.5" fill="white" transform="rotate(15 14 18)" />
            <ellipse cx="12" cy="28" rx="8" ry="4" fill="white" transform="rotate(5 12 28)" />
          </g>
        </g>

        {/* Bottom decorative ribbon elements */}
        <g transform="translate(0, 35)">
          {/* Left ribbon */}
          <path
            d="M-45,8 Q-35,0 -20,8 L-20,18 Q-35,12 -45,18 Z"
            fill="white"
            stroke="none"
          />

          {/* Right ribbon */}
          <path
            d="M45,8 Q35,0 20,8 L20,18 Q35,12 45,18 Z"
            fill="white"
            stroke="none"
          />

          {/* Center ribbon connecting element */}
          <path
            d="M-20,8 Q0,0 20,8 L20,18 Q0,12 -20,18 Z"
            fill="white"
            stroke="none"
          />
        </g>
      </g>
      
      {/* DÜRKS Text */}
      <g transform="translate(200, 160)">
        <text
          x="0"
          y="0"
          textAnchor="middle"
          fontSize="64"
          fontWeight="900"
          fontFamily="Arial, sans-serif"
          fill="white"
          letterSpacing="4px"
        >
          DÜRKS
        </text>
      </g>

      {/* Consultoria e Engenharia Text */}
      <g transform="translate(200, 200)">
        <text
          x="0"
          y="0"
          textAnchor="middle"
          fontSize="18"
          fontWeight="400"
          fontFamily="Arial, sans-serif"
          fill="white"
          letterSpacing="4px"
        >
          CONSULTORIA E ENGENHARIA
        </text>
      </g>
    </svg>
  );
};

export default DurksLogo;

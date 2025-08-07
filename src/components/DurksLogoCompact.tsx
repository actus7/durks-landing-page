import React from 'react';

interface DurksLogoCompactProps {
  className?: string;
  width?: number;
  height?: number;
}

const DurksLogoCompact: React.FC<DurksLogoCompactProps> = ({ 
  className = "", 
  width = 280, 
  height = 160 
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 280 160"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hexagonal Badge */}
      <g transform="translate(140, 45)">
        {/* Outer hexagon with rounded corners */}
        <path
          d="M-25,-43.3 L25,-43.3 L50,0 L25,43.3 L-25,43.3 L-50,0 Z"
          fill="white"
          stroke="none"
        />
        
        {/* Inner hexagon background */}
        <path
          d="M-20,-34.6 L20,-34.6 L40,0 L20,34.6 L-20,34.6 L-40,0 Z"
          fill="#253831"
          stroke="none"
        />
        
        {/* Wheat/grain symbol */}
        <g transform="translate(0, -5)">
          {/* Central stem */}
          <rect x="-1" y="5" width="2" height="25" fill="white" rx="1" />
          
          {/* Top grain cluster */}
          <ellipse cx="0" cy="0" rx="3" ry="6" fill="white" />
          
          {/* Grain leaves - arranged more naturally */}
          <g>
            {/* Left side grains */}
            <ellipse cx="-8" cy="6" rx="6" ry="3" fill="white" transform="rotate(-25 -8 6)" />
            <ellipse cx="-10" cy="14" rx="7" ry="3.5" fill="white" transform="rotate(-15 -10 14)" />
            <ellipse cx="-8" cy="22" rx="6" ry="3" fill="white" transform="rotate(-5 -8 22)" />
            
            {/* Right side grains */}
            <ellipse cx="8" cy="6" rx="6" ry="3" fill="white" transform="rotate(25 8 6)" />
            <ellipse cx="10" cy="14" rx="7" ry="3.5" fill="white" transform="rotate(15 10 14)" />
            <ellipse cx="8" cy="22" rx="6" ry="3" fill="white" transform="rotate(5 8 22)" />
          </g>
        </g>
        
        {/* Bottom decorative ribbon elements */}
        <g transform="translate(0, 25)">
          {/* Left ribbon */}
          <path
            d="M-32,6 Q-25,0 -15,6 L-15,12 Q-25,8 -32,12 Z"
            fill="white"
            stroke="none"
          />
          
          {/* Right ribbon */}
          <path
            d="M32,6 Q25,0 15,6 L15,12 Q25,8 32,12 Z"
            fill="white"
            stroke="none"
          />
          
          {/* Center ribbon connecting element */}
          <path
            d="M-15,6 Q0,0 15,6 L15,12 Q0,8 -15,12 Z"
            fill="white"
            stroke="none"
          />
        </g>
      </g>
      
      {/* DÜRKS Text */}
      <g transform="translate(140, 115)">
        <text
          x="0"
          y="0"
          textAnchor="middle"
          fontSize="42"
          fontWeight="900"
          fontFamily="Arial, sans-serif"
          fill="white"
          letterSpacing="3px"
        >
          DÜRKS
        </text>
      </g>
      
      {/* Consultoria e Engenharia Text */}
      <g transform="translate(140, 145)">
        <text
          x="0"
          y="0"
          textAnchor="middle"
          fontSize="14"
          fontWeight="400"
          fontFamily="Arial, sans-serif"
          fill="white"
          letterSpacing="3px"
        >
          CONSULTORIA E ENGENHARIA
        </text>
      </g>
    </svg>
  );
};

export default DurksLogoCompact;

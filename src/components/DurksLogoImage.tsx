import React from 'react';
import OptimizedImage from './OptimizedImage';

interface DurksLogoImageProps {
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
}

const DurksLogoImage: React.FC<DurksLogoImageProps> = ({
  className = "",
  width = 208,
  height = 125,
  alt = "DÜRKS Consultoria e Engenharia"
}) => {
  const imageStyles = {
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
    // Dimensões fixas para evitar layout shift
    width: `${width}px`,
    height: `${height}px`,
    aspectRatio: `${width}/${height}`
  };

  return (
    <OptimizedImage
      src="/logo-durks.png"
      alt={alt}
      className={className}
      width={width}
      height={height}
      style={imageStyles}
      loading="eager"
      priority={true}
    />
  );
};

export default DurksLogoImage;

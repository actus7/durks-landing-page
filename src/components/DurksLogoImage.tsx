import React from 'react';

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
    maxWidth: '100%',
    width: `${width}px`,
    height: 'auto',
    objectFit: 'contain' as const,
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
  };

  return (
    <img
      src="/logo-durks.png"
      alt={alt}
      className={`${className} select-none`}
      width={width}
      height={height}
      style={imageStyles}
      loading="eager"
      decoding="async"
    />
  );
};

export default DurksLogoImage;

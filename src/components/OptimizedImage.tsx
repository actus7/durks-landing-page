import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  placeholder?: string;
  sizes?: string;
  style?: React.CSSProperties;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  priority = false,
  placeholder,
  sizes,
  style
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (priority || loading === 'eager') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, loading]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  // Gerar srcSet para diferentes densidades de pixel
  const generateSrcSet = (baseSrc: string) => {
    const extension = baseSrc.split('.').pop();
    const baseName = baseSrc.replace(`.${extension}`, '');
    
    return [
      `${baseSrc} 1x`,
      `${baseSrc} 2x` // Para telas de alta densidade
    ].join(', ');
  };

  const imageStyles: React.CSSProperties = {
    ...style,
    transition: 'opacity 0.3s ease-in-out',
    opacity: isLoaded ? 1 : 0,
    ...(width && { width: `${width}px` }),
    ...(height && { height: `${height}px` }),
    objectFit: 'contain',
    maxWidth: '100%',
    height: 'auto'
  };

  const placeholderStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: isLoaded ? 0 : 1,
    transition: 'opacity 0.3s ease-in-out',
    borderRadius: 'inherit'
  };

  if (hasError) {
    return (
      <div 
        className={`bg-muted flex items-center justify-center ${className}`}
        style={{ width, height, ...style }}
      >
        <span className="text-muted-foreground text-sm">Erro ao carregar imagem</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={imgRef}>
      {/* Placeholder */}
      {!isLoaded && (
        <div style={placeholderStyles}>
          {placeholder ? (
            <img src={placeholder} alt="" className="blur-sm" />
          ) : (
            <div className="animate-pulse bg-muted-foreground/20 rounded w-8 h-8" />
          )}
        </div>
      )}
      
      {/* Imagem principal */}
      {isInView && (
        <img
          src={src}
          srcSet={generateSrcSet(src)}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          decoding="async"
          sizes={sizes}
          style={imageStyles}
          onLoad={handleLoad}
          onError={handleError}
          className="select-none"
        />
      )}
    </div>
  );
};

export default OptimizedImage;

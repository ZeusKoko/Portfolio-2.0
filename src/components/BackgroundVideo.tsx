import React, { useEffect, useRef, useState } from 'react';

// Video stream from Google Flow shared video (ID: 65755794-adcf-4194-9144-6e7ca094ba5d)
// Cached locally in /video/flow_video.mp4 with live CDN stream fallback
const VIDEO_URL = '/video/flow_video.mp4';
const REMOTE_STREAM_URL =
  'https://flow-content.google/video/24ff2ab9-f137-40d4-a925-5c25f298143a?Expires=1792604614&KeyName=labs-flow-prod-cdn-key&Signature=hQpDul1tvNj_m1gLzmzg2McuF6Q';
const SENSITIVITY = 0.8;

export const BackgroundVideo: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string>(VIDEO_URL);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const video = videoRef.current;
      if (!video || !video.duration || isNaN(video.duration)) return;

      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      targetTimeRef.current = Math.min(
        Math.max(0, targetTimeRef.current + timeOffset),
        video.duration
      );

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    // Touch support for mobile scrubbing
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        prevXRef.current = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const clientX = e.touches[0].clientX;
        const video = videoRef.current;
        if (!video || !video.duration || isNaN(video.duration)) return;

        if (prevXRef.current === null) {
          prevXRef.current = clientX;
          return;
        }

        const delta = clientX - prevXRef.current;
        prevXRef.current = clientX;

        const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
        targetTimeRef.current = Math.min(
          Math.max(0, targetTimeRef.current + timeOffset),
          video.duration
        );

        if (!isSeekingRef.current) {
          isSeekingRef.current = true;
          video.currentTime = targetTimeRef.current;
        }
      }
    };

    const handleTouchEnd = () => {
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      targetTimeRef.current = videoRef.current.currentTime || 0;
    }
  };

  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video) return;

    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.03) {
      video.currentTime = targetTimeRef.current;
    } else {
      isSeekingRef.current = false;
    }
  };

  const handleVideoError = () => {
    if (videoSrc !== REMOTE_STREAM_URL) {
      console.warn('Switching to remote stream URL');
      setVideoSrc(REMOTE_STREAM_URL);
    }
  };

  return (
    <video
      ref={videoRef}
      src={videoSrc}
      muted
      playsInline
      preload="auto"
      onLoadedMetadata={handleLoadedMetadata}
      onSeeked={handleSeeked}
      onError={handleVideoError}
      className="fixed inset-0 z-0 h-full w-full object-cover select-none pointer-events-none"
      style={{
        objectPosition: '70% center',
      }}
    />
  );
};

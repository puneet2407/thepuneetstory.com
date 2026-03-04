"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  width,
  height,
  fill = false,
  priority = false,
  sizes,
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false);

  if (didError) {
    return (
      <div
        className={`bg-gray-100 flex items-center justify-center ${className ?? ""}`}
      >
        <svg
          width="88"
          height="88"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#000"
          strokeLinejoin="round"
          opacity=".3"
          fill="none"
          strokeWidth="3.7"
        >
          <rect x="16" y="16" width="56" height="56" rx="6" />
          <path d="m16 58 16-18 32 32" />
          <circle cx="53" cy="35" r="7" />
        </svg>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        onError={() => setDidError(true)}
        priority={priority}
        sizes={sizes ?? "100vw"}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 1080}
      height={height ?? 1350}
      className={className}
      onError={() => setDidError(true)}
      priority={priority}
      sizes={sizes}
    />
  );
}

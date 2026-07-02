"use client";

import { useEffect, useRef, useState } from "react";

const HLS_CDN = "https://cdn.jsdelivr.net/npm/hls.js@1.5.8/dist/hls.min.js";
const VIDEO_SRC =
  "https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8";

declare global {
  interface Window {
    Hls: any;
  }
}

function loadHls(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Hls) { resolve(); return; }
    const existing = document.querySelector(`script[src="${HLS_CDN}"]`);
    if (existing) { existing.addEventListener("load", () => resolve()); return; }
    const s = document.createElement("script");
    s.src = HLS_CDN;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

export function VideoHeroBg({ opacity = 0.4 }: { opacity?: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let hls: any;

    (async () => {
      try {
        await loadHls();
        const Hls = window.Hls;

        if (Hls.isSupported()) {
          hls = new Hls({ maxBufferLength: 10, backBufferLength: 0, startLevel: -1 });
          hls.loadSource(VIDEO_SRC);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => video.play().catch(() => {}));
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          // Safari native HLS
          video.src = VIDEO_SRC;
          video.addEventListener("loadedmetadata", () => video.play().catch(() => {}));
        }

        video.addEventListener("playing", () => setReady(true), { once: true });
      } catch {
        // video failed silently — page still works
      }
    })();

    return () => { hls?.destroy(); };
  }, []);

  return (
    <>
      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{
          opacity: ready ? opacity : 0,
          transition: "opacity 1.6s ease",
          zIndex: 0,
        }}
      />

      {/* Gradient vignette — keeps text legible over any video content */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: [
            "linear-gradient(to bottom, rgba(5,7,9,0.85) 0%, rgba(5,7,9,0.25) 30%, transparent 55%)",
            "linear-gradient(to top,   rgba(5,7,9,0.95) 0%, rgba(5,7,9,0.5)  28%, transparent 58%)",
            "linear-gradient(to right, rgba(5,7,9,0.5)  0%, transparent 35%, transparent 65%, rgba(5,7,9,0.5) 100%)",
          ].join(", "),
        }}
      />

      {/* Scanline texture — reinforces the terminal / intelligence aesthetic */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)",
        }}
      />
    </>
  );
}

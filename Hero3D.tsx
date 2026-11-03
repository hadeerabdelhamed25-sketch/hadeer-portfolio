'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
// Decorative only: a gold light point travelling along a tilted orbit. Skipped on small screens / reduced motion.
export default function Hero3D() {
  const c = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = c.current; if (!cv || innerWidth < 640 || matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    let raf = 0;
    try {
      const r = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true });
      const sc = new THREE.Scene(), cm = new THREE.PerspectiveCamera(40, 1, 0.1, 50); cm.position.z = 7;
      const rs = () => { const w = cv.parentElement!.clientWidth; r.setSize(w, w, false); r.setPixelRatio(Math.min(devicePixelRatio, 2)); }; rs(); addEventListener('resize', rs);
      const g = 0xc19a58;
      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.7, 0.012, 8, 120), new THREE.MeshBasicMaterial({ color: g })); ring.rotation.x = 1.15; sc.add(ring);
      const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(0.45, 0), new THREE.MeshBasicMaterial({ color: g, wireframe: true })); ico.position.set(2.1, 1.9, 0); sc.add(ico);
      const sp = new THREE.Mesh(new THREE.SphereGeometry(0.12, 24, 24), new THREE.MeshBasicMaterial({ color: 0xf3d9a4 })); sc.add(sp);
      let t = 0;
      const a = () => { if (!document.hidden) { t += 0.012; sp.position.set(Math.cos(t) * 2.7, Math.sin(t) * 2.7 * Math.cos(1.15), Math.sin(t) * 2.7 * Math.sin(1.15)); ico.rotation.x += 0.01; ico.rotation.y += 0.014; r.render(sc, cm); } raf = requestAnimationFrame(a); };
      a();
      return () => { cancelAnimationFrame(raf); removeEventListener('resize', rs); r.dispose(); };
    } catch { /* static fallback: CSS ring remains */ }
  }, []);
  return <canvas ref={c} aria-hidden="true" />;
}

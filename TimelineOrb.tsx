'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
// Draws the gold timeline progress and a small 3D orb that travels along it (right->left on desktop, top->bottom on mobile).
export default function TimelineOrb() {
  const c = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = c.current, t = cv?.parentElement as HTMLElement | null; if (!cv || !t) return;
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) { t.style.setProperty('--p', '100%'); return; }
    const prog = () => { const r = t.getBoundingClientRect(); return Math.max(0, Math.min(1, (innerHeight * 0.75 - r.top) / r.height)); };
    const setP = () => t.style.setProperty('--p', prog() * 100 + '%');
    addEventListener('scroll', setP, { passive: true }); setP();
    let raf = 0, r: THREE.WebGLRenderer | undefined, rs = () => {};
    try {
      r = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true }); const sc = new THREE.Scene(), g = 0xc19a58;
      let W = 0, H = 0, cm = new THREE.OrthographicCamera(0, 1, 0, -1, -100, 100);
      rs = () => { W = t.clientWidth; H = t.clientHeight; r!.setSize(W, H, false); r!.setPixelRatio(Math.min(devicePixelRatio, 2)); cm = new THREE.OrthographicCamera(0, W, 0, -H, -100, 100); }; rs(); addEventListener('resize', rs);
      const o = new THREE.Group(), s = new THREE.Mesh(new THREE.SphereGeometry(7, 24, 24), new THREE.MeshBasicMaterial({ color: 0xf3d9a4 }));
      const ic = new THREE.Mesh(new THREE.IcosahedronGeometry(15, 0), new THREE.MeshBasicMaterial({ color: g, wireframe: true }));
      const tr = new THREE.Mesh(new THREE.TorusGeometry(21, 0.8, 8, 48), new THREE.MeshBasicMaterial({ color: g })); o.add(s, ic, tr); sc.add(o);
      const a = () => {
        if (!document.hidden && t.offsetParent) { const p = prog(); if (innerWidth <= 860) o.position.set(W - 19, -(10 + p * (H - 20)), 0); else o.position.set(W * 0.94 - p * W * 0.88, -19, 0);
          ic.rotation.x += 0.02; ic.rotation.y += 0.03; tr.rotation.x += 0.015; tr.rotation.y += 0.02; r!.render(sc, cm); }
        raf = requestAnimationFrame(a);
      }; a();
    } catch { /* progress line still works without WebGL */ }
    return () => { cancelAnimationFrame(raf); removeEventListener('scroll', setP); removeEventListener('resize', rs); r?.dispose(); };
  }, []);
  return <canvas ref={c} id="tc" aria-hidden="true" />;
}

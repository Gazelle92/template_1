"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type BrandsScrollCanvasProps = {
  className?: string;
  imagePath?: string;
  speed?: number;
};

export default function BrandsScrollCanvas({
  className = "",
  imagePath = "/brands-scroll-text.png",
  speed = 0.01,
}: BrandsScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
    camera.position.z = 17;
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const textureLoader = new THREE.TextureLoader();

    let animationId = 0;
    let mesh: THREE.Mesh | null = null;
    let geometry: THREE.CylinderGeometry | null = null;
    let material: THREE.MeshBasicMaterial | null = null;
    let texture: THREE.Texture | null = null;
    let group: THREE.Group | null = null;

    const setSize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (!width || !height) return;

      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    setSize();

    textureLoader.load(
      imagePath,
      (loadedTexture) => {
        texture = loadedTexture;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.repeat.x = 4;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.needsUpdate = true;

        geometry = new THREE.CylinderGeometry(7, 7, 2.8, 20, 1, true);
        material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
          transparent: true,
          depthWrite: false,
        });

        mesh = new THREE.Mesh(geometry, material);

        group = new THREE.Group();
        group.rotation.z = 0.2 * Math.PI;
        group.rotation.x = 0.2 * Math.PI;
        group.add(mesh);
        scene.add(group);

        const animate = () => {
          if (mesh) {
            mesh.rotation.y -= speed;
          }

          renderer.render(scene, camera);
          animationId = window.requestAnimationFrame(animate);
        };

        animate();
      },
      undefined,
      (error) => {
        console.error("Texture load failed:", error);
      }
    );

    window.addEventListener("resize", setSize);

    return () => {
      window.removeEventListener("resize", setSize);
      window.cancelAnimationFrame(animationId);

      if (group && mesh) {
        group.remove(mesh);
      }

      if (mesh) mesh.removeFromParent();
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (texture) texture.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, [imagePath, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        bottom: '0',
        right: '0',
        transform: 'translate(30%, 18%)',
        outline: 'none',
        display: "block",
        width: "28.5714vw",
        height: "28.5714vh",
      }}
    />
  );
}

/*
사용법 예시

import BrandsScrollCanvas from "@/components/BrandsScrollCanvas";

export default function Page() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <BrandsScrollCanvas />
    </div>
  );
}
*/
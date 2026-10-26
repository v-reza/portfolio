"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface GlassesCanvasProps {
  progress: number;
}

export function GlassesCanvas({ progress }: GlassesCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  const glassesGroupRef = useRef<THREE.Group | THREE.Object3D | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // Studio Lighting matching Peter Tilley's Sketchfab setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(5, 8, 7);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffa27b, 1.6);
    fillLight.position.set(-6, -2, 5);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x38bdf8, 2.8, 24);
    rimLight.position.set(0, 5, -4);
    scene.add(rimLight);

    // Root Group
    const glassesRoot = new THREE.Group();
    scene.add(glassesRoot);
    glassesGroupRef.current = glassesRoot;

    // -------------------------------------------------------------
    // 1. Procedural High-Fidelity Pantoscopic Glasses (Fallback)
    // Modeled after Peter Tilley's round tortoise / smoky keyhole frame
    // -------------------------------------------------------------
    const proceduralGroup = new THREE.Group();

    // Frame Material: Translucent smoky tortoise acetate with depth
    const frameMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x161a24,
      transmission: 0.45,
      opacity: 0.94,
      transparent: true,
      roughness: 0.15,
      metalness: 0.08,
      ior: 1.54,
      reflectivity: 0.85,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
    });

    // Lens Material: Glossy tinted lenses with reflections
    const lensMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x07090e,
      transmission: 0.65,
      opacity: 0.94,
      transparent: true,
      roughness: 0.04,
      metalness: 0.1,
      ior: 1.5,
      reflectivity: 0.9,
    });

    // Silver Hinge Hardware
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.15,
    });

    // Helper: Rounded pantoscopic rim shape
    const createPantoscopicRim = (w: number, h: number, r: number, thick: number) => {
      const outer = new THREE.Shape();
      const x0 = -w / 2;
      const y0 = -h / 2;
      outer.moveTo(x0 + r, y0);
      outer.lineTo(x0 + w - r, y0);
      outer.quadraticCurveTo(x0 + w, y0, x0 + w, y0 + r * 0.8);
      outer.lineTo(x0 + w * 0.95, y0 + h - r);
      outer.quadraticCurveTo(x0 + w * 0.95, y0 + h, x0 + w - r, y0 + h);
      outer.lineTo(x0 + r, y0 + h);
      outer.quadraticCurveTo(x0, y0 + h, x0 + w * 0.05, y0 + h - r);
      outer.lineTo(x0, y0 + r * 0.8);
      outer.quadraticCurveTo(x0, y0, x0 + r, y0);

      const hole = new THREE.Path();
      const hw = w - thick * 2;
      const hh = h - thick * 2;
      const hr = Math.max(0.05, r - thick);
      const hx0 = -hw / 2;
      const hy0 = -hh / 2;
      hole.moveTo(hx0 + hr, hy0);
      hole.lineTo(hx0 + hw - hr, hy0);
      hole.quadraticCurveTo(hx0 + hw, hy0, hx0 + hw, hy0 + hr * 0.8);
      hole.lineTo(hx0 + hw * 0.95, hy0 + hh - hr);
      hole.quadraticCurveTo(hx0 + hw * 0.95, hy0 + hh, hx0 + hw - hr, hy0 + hh);
      hole.lineTo(hx0 + hr, hy0 + hh);
      hole.quadraticCurveTo(hx0, hy0 + hh, hx0 + hw * 0.05, hy0 + hh - hr);
      hole.lineTo(hx0, hy0 + hr * 0.8);
      hole.quadraticCurveTo(hx0, hy0, hx0 + hr, hy0);

      outer.holes.push(hole);
      return outer;
    };

    const extrudeSettings = {
      depth: 0.16,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    };

    const rimWidth = 1.75;
    const rimHeight = 1.45;
    const cornerRadius = 0.55;
    const rimThickness = 0.13;
    const eyeSpacing = 1.08;

    const rimShape = createPantoscopicRim(rimWidth, rimHeight, cornerRadius, rimThickness);
    const rimGeometry = new THREE.ExtrudeGeometry(rimShape, extrudeSettings);

    // Left & Right Rims
    const leftRim = new THREE.Mesh(rimGeometry, frameMaterial);
    leftRim.position.set(-eyeSpacing, 0, 0);
    proceduralGroup.add(leftRim);

    const rightRim = new THREE.Mesh(rimGeometry, frameMaterial);
    rightRim.position.set(eyeSpacing, 0, 0);
    proceduralGroup.add(rightRim);

    // Lenses
    const lensShape = new THREE.Shape();
    const lw = rimWidth - rimThickness * 1.5;
    const lh = rimHeight - rimThickness * 1.5;
    const lr = cornerRadius - 0.08;
    const lx0 = -lw / 2;
    const ly0 = -lh / 2;
    lensShape.moveTo(lx0 + lr, ly0);
    lensShape.lineTo(lx0 + lw - lr, ly0);
    lensShape.quadraticCurveTo(lx0 + lw, ly0, lx0 + lw, ly0 + lr * 0.8);
    lensShape.lineTo(lx0 + lw * 0.95, ly0 + lh - lr);
    lensShape.quadraticCurveTo(lx0 + lw * 0.95, ly0 + lh, lx0 + lw - lr, ly0 + lh);
    lensShape.lineTo(lx0 + lr, ly0 + lh);
    lensShape.quadraticCurveTo(lx0, ly0 + lh, lx0 + lw * 0.05, ly0 + lh - lr);
    lensShape.lineTo(lx0, ly0 + lr * 0.8);
    lensShape.quadraticCurveTo(lx0, ly0, lx0 + lr, ly0);

    const lensGeom = new THREE.ShapeGeometry(lensShape);
    const leftLens = new THREE.Mesh(lensGeom, lensMaterial);
    leftLens.position.set(-eyeSpacing, 0, 0.08);
    proceduralGroup.add(leftLens);

    const rightLens = new THREE.Mesh(lensGeom, lensMaterial);
    rightLens.position.set(eyeSpacing, 0, 0.08);
    proceduralGroup.add(rightLens);

    // Keyhole Bridge
    const bridgeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-eyeSpacing + rimWidth / 2 - 0.05, 0.28, 0.08),
      new THREE.Vector3(0, 0.52, 0.12),
      new THREE.Vector3(eyeSpacing - rimWidth / 2 + 0.05, 0.28, 0.08),
    ]);
    const bridgeGeom = new THREE.TubeGeometry(bridgeCurve, 16, 0.065, 8, false);
    const bridgeMesh = new THREE.Mesh(bridgeGeom, frameMaterial);
    proceduralGroup.add(bridgeMesh);

    // Temples (arms) extending back
    const templeLength = 3.8;
    const templeGeom = new THREE.BoxGeometry(0.08, 0.12, templeLength);

    const leftTemple = new THREE.Mesh(templeGeom, frameMaterial);
    leftTemple.position.set(-eyeSpacing - rimWidth / 2 + 0.04, 0.38, -templeLength / 2);
    leftTemple.rotation.y = 0.08;
    proceduralGroup.add(leftTemple);

    const rightTemple = new THREE.Mesh(templeGeom, frameMaterial);
    rightTemple.position.set(eyeSpacing + rimWidth / 2 - 0.04, 0.38, -templeLength / 2);
    rightTemple.rotation.y = -0.08;
    proceduralGroup.add(rightTemple);

    // Silver Hinge Rivets
    const pinGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.04, 12);
    pinGeom.rotateX(Math.PI / 2);

    const leftPin = new THREE.Mesh(pinGeom, metalMaterial);
    leftPin.position.set(-eyeSpacing - rimWidth / 2 + 0.1, 0.38, 0.22);
    proceduralGroup.add(leftPin);

    const rightPin = new THREE.Mesh(pinGeom, metalMaterial);
    rightPin.position.set(eyeSpacing + rimWidth / 2 - 0.1, 0.38, 0.22);
    proceduralGroup.add(rightPin);

    proceduralGroup.scale.set(1.3, 1.3, 1.3);
    proceduralGroup.position.set(0, -0.08, 0);
    glassesRoot.add(proceduralGroup);

    // -------------------------------------------------------------
    // 2. Try loading Sketchfab Peter Tilley GLTF/GLB if present
    // User can place glasses.glb into /public/models/glasses.glb
    // -------------------------------------------------------------
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "/models/glasses/scene.gltf",
      (gltf) => {
        console.log("GLTF glasses loaded!");
        const loadedModel = gltf.scene;
        const modelWrapper = new THREE.Group();
        const box = new THREE.Box3().setFromObject(loadedModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        loadedModel.position.set(-center.x, -center.y, -center.z);
        modelWrapper.add(loadedModel);

        const maxDim = Math.max(size.x, size.y, size.z);
        const scaleFactor = 4.8 / maxDim;
        modelWrapper.scale.set(scaleFactor, scaleFactor, scaleFactor);

        // Replace procedural with loaded Sketchfab model
        glassesRoot.remove(proceduralGroup);
        glassesRoot.add(modelWrapper);
      }
    );

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x * 0.35;
      mouseY = y * 0.2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const p = progressRef.current; // 0 to 1

      if (glassesRoot) {
        // Subtle floating in idle
        const floatY = Math.sin(elapsed * 1.5) * 0.05 * (1 - p);
        const floatRot = Math.cos(elapsed * 1.2) * 0.03 * (1 - p);

        // Rotation: tilted when starting, squarely faces camera as it zooms
        const targetPitch = THREE.MathUtils.lerp(-0.1 + floatRot, 0, p);
        const targetYaw = THREE.MathUtils.lerp(0.28 + mouseX * (1 - p), 0, p);
        const targetRoll = THREE.MathUtils.lerp(-0.04, 0, p);

        glassesRoot.rotation.x = THREE.MathUtils.lerp(glassesRoot.rotation.x, targetPitch + mouseY * (1 - p), 0.1);
        glassesRoot.rotation.y = THREE.MathUtils.lerp(glassesRoot.rotation.y, targetYaw, 0.1);
        glassesRoot.rotation.z = THREE.MathUtils.lerp(glassesRoot.rotation.z, targetRoll, 0.1);

        // Zoom toward camera (starts at Z = 0, zooms to Z = 7.8)
        const targetZ = THREE.MathUtils.lerp(0, 7.8, Math.pow(p, 1.8));
        const targetY = THREE.MathUtils.lerp(-0.08 + floatY, 0, p);
        glassesRoot.position.z = THREE.MathUtils.lerp(glassesRoot.position.z, targetZ, 0.15);
        glassesRoot.position.y = THREE.MathUtils.lerp(glassesRoot.position.y, targetY, 0.1);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      rimGeometry.dispose();
      lensGeom.dispose();
      bridgeGeom.dispose();
      templeGeom.dispose();
      pinGeom.dispose();
      frameMaterial.dispose();
      lensMaterial.dispose();
      metalMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}

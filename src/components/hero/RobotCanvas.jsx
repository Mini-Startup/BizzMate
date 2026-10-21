"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { useMounted } from "@/hooks/useMounted";

// Filter out internal THREE.Clock deprecation warning emitted by older @react-three/fiber internals
if (typeof window !== "undefined") {
  const origWarn = console.warn;
  console.warn = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("THREE.Clock: This module has been deprecated")
    ) {
      return;
    }
    origWarn.apply(console, args);
  };
}

class HeartCurve extends THREE.Curve {
  getPoint(t, optionalTarget = new THREE.Vector3()) {
    const angle = t * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(angle), 3);
    const y =
      13 * Math.cos(angle) -
      5 * Math.cos(2 * angle) -
      2 * Math.cos(3 * angle) -
      Math.cos(4 * angle);

    return optionalTarget.set(x * 0.002, (y + 6) * 0.002, 0);
  }
}

const sharedHeartCurve = new HeartCurve();

function ResponsiveGroup({ children, scale = 1.45 }) {
  const { viewport } = useThree();
  const base = Math.min(1.18, Math.max(0.7, viewport.width / 4.4));
  const s = base * scale;
  return <group scale={s}>{children}</group>;
}

function GlassCapsule({ color, power = 2.8, intensity = 0.7 }) {
  const materialRef = useRef(null);

  const uniforms = useMemo(
    () => ({
      color: { value: new THREE.Color(color) },
      power: { value: power },
      intensity: { value: intensity },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.color.value.set(color);
      materialRef.current.uniforms.power.value = power;
      materialRef.current.uniforms.intensity.value = intensity;
    }
  }, [color, power, intensity]);

  return (
    <mesh>
      {/* Optimized from 64,64 to 32,32 for 75% triangle reduction with zero visual difference */}
      <sphereGeometry args={[0.3, 32, 32, 0, Math.PI * 2, 0, Math.PI]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={`
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vViewPosition = -mvPosition.xyz;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 color;
          uniform float power;
          uniform float intensity;
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(vViewPosition);
            float fresnel = 1.0 - max(dot(viewDir, normal), 0.0);
            fresnel = pow(fresnel, power);
            gl_FragColor = vec4(color, fresnel * intensity);
          }
        `}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// Module-level shared standard materials to avoid re-allocations
const earBaseMat = new THREE.MeshStandardMaterial({
  color: "#e2e8f0",
  roughness: 0.4,
});
const earRingMat = new THREE.MeshStandardMaterial({
  color: "#ffffff",
  roughness: 0.2,
  metalness: 0.1,
});
const earCenterMat = new THREE.MeshStandardMaterial({
  color: "#94a3b8",
  roughness: 0.6,
});
const antennaBaseMat = new THREE.MeshStandardMaterial({
  color: "#64748b",
  roughness: 0.3,
  metalness: 0.6,
});
const antennaStickMat = new THREE.MeshStandardMaterial({
  color: "#cbd5e1",
  roughness: 0.3,
  metalness: 0.3,
});
const antennaTipMat = new THREE.MeshStandardMaterial({
  color: "#a84bff",
  emissive: "#a84bff",
  emissiveIntensity: 0.8,
  roughness: 0.1,
  toneMapped: false,
});

function RobotEar({ position, scale = 1, isLeft = false }) {
  const dir = isLeft ? -1 : 1;

  return (
    <group position={position} scale={scale}>
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        castShadow
        receiveShadow
        material={earBaseMat}
      >
        <cylinderGeometry args={[0.04, 0.04, 0.025, 16]} />
      </mesh>

      <mesh
        position={[dir * 0.012, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
        receiveShadow
        material={earRingMat}
      >
        <torusGeometry args={[0.032, 0.008, 12, 24]} />
      </mesh>

      <mesh
        position={[dir * 0.012, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
        receiveShadow
        material={earCenterMat}
      >
        <cylinderGeometry args={[0.03, 0.03, 0.005, 16]} />
      </mesh>

      <group position={[dir * 0.015, 0.035, 0]} rotation={[-0.4, 0, 0]}>
        <mesh
          position={[0, 0.01, 0]}
          castShadow
          receiveShadow
          material={antennaBaseMat}
        >
          <cylinderGeometry args={[0.006, 0.008, 0.02, 12]} />
        </mesh>
        <mesh
          position={[0, 0.06, 0]}
          castShadow
          receiveShadow
          material={antennaStickMat}
        >
          <cylinderGeometry args={[0.003, 0.003, 0.1, 8]} />
        </mesh>
        <mesh
          position={[0, 0.11, 0]}
          castShadow
          receiveShadow
          material={antennaTipMat}
        >
          <sphereGeometry args={[0.007, 12, 12]} />
        </mesh>
      </group>
    </group>
  );
}

const eyeMat = new THREE.MeshBasicMaterial({
  color: new THREE.Color("#57c0e5"),
  toneMapped: false,
  transparent: true,
});
const heartMat = new THREE.MeshBasicMaterial({
  color: new THREE.Color("#a84bff"),
  toneMapped: false,
});

function RobotEye({
  position,
  rotation,
  scale = 1,
  blinkDuration = 0.15,
  blinkCycle = 3.2,
  isLovedRef,
}) {
  const groupRef = useRef(null);
  const normalEyesRef = useRef(null);
  const heartEyeRef = useRef(null);

  useFrame(() => {
    if (!groupRef.current || !normalEyesRef.current || !heartEyeRef.current)
      return;

    const isHeart = isLovedRef.current;

    normalEyesRef.current.visible = !isHeart;
    heartEyeRef.current.visible = isHeart;

    const elapsed = performance.now() * 0.001;
    const cycle = elapsed % blinkCycle;
    let targetScaleY = 1;

    if (cycle < blinkDuration && !isHeart) {
      const progress = cycle / blinkDuration;
      const blinkClose = Math.sin(progress * Math.PI);
      targetScaleY = Math.max(0.05, 1.0 - blinkClose);
    }

    groupRef.current.scale.set(scale, scale * targetScaleY, scale);
  });

  const { topPath, bottomPath } = useMemo(() => {
    const w = 0.025;
    const h = 0.035;
    const r = 0.02;
    const g = 0.005;

    const tPath = new THREE.CurvePath();
    tPath.add(new THREE.LineCurve3(new THREE.Vector3(-w, g, 0), new THREE.Vector3(-w, h - r, 0)));
    tPath.add(new THREE.QuadraticBezierCurve3(new THREE.Vector3(-w, h - r, 0), new THREE.Vector3(-w, h, 0), new THREE.Vector3(-w + r, h, 0)));
    tPath.add(new THREE.LineCurve3(new THREE.Vector3(-w + r, h, 0), new THREE.Vector3(w - r, h, 0)));
    tPath.add(new THREE.QuadraticBezierCurve3(new THREE.Vector3(w - r, h, 0), new THREE.Vector3(w, h, 0), new THREE.Vector3(w, h - r, 0)));
    tPath.add(new THREE.LineCurve3(new THREE.Vector3(w, h - r, 0), new THREE.Vector3(w, g, 0)));

    const bPath = new THREE.CurvePath();
    bPath.add(new THREE.LineCurve3(new THREE.Vector3(-w, -g, 0), new THREE.Vector3(-w, -(h - r), 0)));
    bPath.add(new THREE.QuadraticBezierCurve3(new THREE.Vector3(-w, -(h - r), 0), new THREE.Vector3(-w, -h, 0), new THREE.Vector3(-w + r, -h, 0)));
    bPath.add(new THREE.LineCurve3(new THREE.Vector3(-w + r, -h, 0), new THREE.Vector3(w - r, -h, 0)));
    bPath.add(new THREE.QuadraticBezierCurve3(new THREE.Vector3(w - r, -h, 0), new THREE.Vector3(w, -h, 0), new THREE.Vector3(w, -(h - r), 0)));
    bPath.add(new THREE.LineCurve3(new THREE.Vector3(w, -(h - r), 0), new THREE.Vector3(w, -g, 0)));

    return { topPath: tPath, bottomPath: bPath };
  }, []);

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <mesh ref={heartEyeRef} visible={false} material={heartMat}>
        <tubeGeometry args={[sharedHeartCurve, 32, 0.0035, 6, true]} />
      </mesh>

      <group ref={normalEyesRef}>
        <mesh material={eyeMat}>
          <tubeGeometry args={[topPath, 16, 0.0035, 6, false]} />
        </mesh>
        <mesh material={eyeMat}>
          <tubeGeometry args={[bottomPath, 16, 0.0035, 6, false]} />
        </mesh>
      </group>
    </group>
  );
}

// Module-level memoized PBR texture generator (lightweight 128x128 canvas, generated once)
let cachedPbrTextures = null;

function getPbrTextures() {
  if (cachedPbrTextures) return cachedPbrTextures;
  if (typeof document === "undefined") return { colorMap: null, bumpMap: null };

  const size = 128;
  const canvasC = document.createElement("canvas");
  const canvasB = document.createElement("canvas");
  canvasC.width = canvasB.width = size;
  canvasC.height = canvasB.height = size;
  const ctxC = canvasC.getContext("2d");
  const ctxB = canvasB.getContext("2d");

  if (ctxC && ctxB) {
    ctxC.fillStyle = "#f8fafc";
    ctxC.fillRect(0, 0, size, size);
    ctxB.fillStyle = "#808080";
    ctxB.fillRect(0, 0, size, size);

    const imgC = ctxC.getImageData(0, 0, size, size);
    const imgB = ctxB.getImageData(0, 0, size, size);
    const bufC = new Uint32Array(imgC.data.buffer);
    const bufB = new Uint32Array(imgB.data.buffer);

    const total = size * size;
    for (let i = 0; i < total; i++) {
      const rand = Math.random();
      if (rand < 0.12) {
        const isDark = rand > 0.036;
        bufC[i] = isDark ? 0xfff0e8e2 : 0xffffffff;
        bufB[i] = isDark ? 0xff404040 : 0xffffffff;
      }
    }

    ctxC.putImageData(imgC, 0, 0);
    ctxB.putImageData(imgB, 0, 0);
  }

  const texC = new THREE.CanvasTexture(canvasC);
  const texB = new THREE.CanvasTexture(canvasB);
  texC.wrapS = texB.wrapS = THREE.RepeatWrapping;
  texC.wrapT = texB.wrapT = THREE.RepeatWrapping;
  texC.repeat.set(6, 3);
  texB.repeat.set(6, 3);
  texC.generateMipmaps = true;
  texB.generateMipmaps = true;

  cachedPbrTextures = { colorMap: texC, bumpMap: texB };
  return cachedPbrTextures;
}

function RobotModel({
  color = "#ffffff",
  pantallaColor = "#a84bff",
  pantallaBrillo = 1.3,
  blinkCycle = 3.2,
  shadowRef,
  onReady,
}) {
  const isLovedRef = useRef(false);
  const timeoutRef = useRef(null);
  const bodyRef = useRef(null);
  const headRef = useRef(null);
  const readyNotifiedRef = useRef(false);

  const pointerRef = useRef({ x: 0, y: 0 });
  const lastActiveRef = useRef(Date.now());

  useEffect(() => {
    let idleTimer = null;

    const handleMove = (e) => {
      lastActiveRef.current = Date.now();
      // Track pointer smoothly within hero scroll bounds
      if (window.scrollY < 300) {
        pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointerRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      }

      if (idleTimer) clearTimeout(idleTimer);
      // If user stops moving mouse for 2.5s (e.g. leaves cursor idle), gently return to center
      idleTimer = setTimeout(() => {
        pointerRef.current.x = 0;
        pointerRef.current.y = 0;
      }, 2500);
    };

    const handleScroll = () => {
      if (window.scrollY > 150) {
        pointerRef.current.x = 0;
        pointerRef.current.y = 0;
      }
    };

    const handleMouseLeave = () => {
      pointerRef.current.x = 0;
      pointerRef.current.y = 0;
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, []);

  // Frame-rate independent delta damping & safe-zone displacement
  useFrame((_state, delta) => {
    if (!bodyRef.current || !headRef.current) return;

    if (!readyNotifiedRef.current) {
      readyNotifiedRef.current = true;
      if (onReady) onReady();
    }

    const dt = Math.min(delta, 0.1);

    const tx = pointerRef.current.x;
    const ty = pointerRef.current.y;

    // Strict Safe-Zone Clamping in X-axis:
    // Keeps robot body within the safe central corridor (±0.38 world units)
    // so it NEVER drifts to screen edges or overlaps headlines.
    const MAX_SAFE_X = 0.38;
    const targetPosX = Math.tanh(tx * 1.05) * MAX_SAFE_X;

    // Body position: moves ONLY in X axis, locked at -0.35 in Y axis
    bodyRef.current.position.x = THREE.MathUtils.damp(
      bodyRef.current.position.x,
      targetPosX,
      3.2,
      dt
    );
    bodyRef.current.position.y = -0.35; // Locked strictly in Y axis

    // Synchronously translate contact shadow along X with the robot body
    if (shadowRef && shadowRef.current) {
      shadowRef.current.position.x = bodyRef.current.position.x;
    }

    const relativeX = tx - bodyRef.current.position.x / 2.5;

    // Natural responsive body tilt
    const bodyTargetRotY = -relativeX * 0.75;
    const bodyTargetRotX = -ty * 0.20;
    const bodyTargetRotZ = -relativeX * 0.12;

    bodyRef.current.rotation.y = THREE.MathUtils.damp(
      bodyRef.current.rotation.y,
      bodyTargetRotY,
      4.0,
      dt
    );
    bodyRef.current.rotation.x = THREE.MathUtils.damp(
      bodyRef.current.rotation.x,
      bodyTargetRotX,
      4.0,
      dt
    );
    bodyRef.current.rotation.z = THREE.MathUtils.damp(
      bodyRef.current.rotation.z,
      bodyTargetRotZ,
      4.0,
      dt
    );

    // Highly accurate, expressive head tracking: restores full original look range (yaw 1.6, pitch 0.38)
    // Robot head turns accurately to track cursor in real-time
    const headTargetRotY = relativeX * 1.6;
    const headTargetRotX = -ty * 0.38;

    headRef.current.rotation.y = THREE.MathUtils.damp(
      headRef.current.rotation.y,
      headTargetRotY,
      6.0,
      dt
    );
    headRef.current.rotation.x = THREE.MathUtils.damp(
      headRef.current.rotation.x,
      headTargetRotX,
      6.0,
      dt
    );
  });

  const textures = useMemo(() => getPbrTextures(), []);

  const handlePointerDown = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    isLovedRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isLovedRef.current = false;
    }, 2200);
  };

  const handlePointerOver = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (typeof document !== "undefined") document.body.style.cursor = "pointer";
  };

  const handlePointerOut = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (typeof document !== "undefined") document.body.style.cursor = "auto";
  };

  useEffect(() => {
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.cursor = "auto";
      }
    };
  }, []);

  const neckProfile = useMemo(() => {
    const points = [
      new THREE.Vector2(0.1, -0.05),
      new THREE.Vector2(0.215, -0.05),
      new THREE.Vector2(0.28, 0.02),
      new THREE.Vector2(0.295, 0.045),
      new THREE.Vector2(0.27, 0.055),
      new THREE.Vector2(0.1, 0.055),
      new THREE.Vector2(0.1, 0.055),
    ];
    return points;
  }, []);

  const headMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0f172a",
        roughness: 0.9,
        metalness: 0.1,
      }),
    []
  );

  return (
    <group
      ref={bodyRef}
      position={[0, -0.35, 0]}
      onPointerDown={handlePointerDown}
      onClick={handlePointerDown}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Invisible Full-Body Hit Collider: guarantees 100% raycast coverage across entire white body, neck, and seams with zero dead zones */}
      <mesh
        onPointerDown={handlePointerDown}
        onClick={handlePointerDown}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[0.48, 24, 24]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Robot Torso - Optimized from 64x64 to 32x32 */}
      <mesh
        castShadow
        receiveShadow
        onPointerDown={handlePointerDown}
        onClick={handlePointerDown}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[0.43, 32, 32, 0, Math.PI * 2, Math.PI * 0.15, Math.PI * 0.85]} />
        <meshStandardMaterial
          color={color}
          map={textures.colorMap || undefined}
          bumpMap={textures.bumpMap || undefined}
          bumpScale={0.004}
          roughness={0.7}
          metalness={0.08}
        />
      </mesh>

      {/* Body Bevel Ring */}
      <mesh
        position={[0, 0.34, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
        receiveShadow
        onPointerDown={handlePointerDown}
        onClick={handlePointerDown}
      >
        <torusGeometry args={[0.235, 0.025, 16, 32]} />
        <meshStandardMaterial
          color={color}
          map={textures.colorMap || undefined}
          bumpMap={textures.bumpMap || undefined}
          bumpScale={0.004}
          roughness={0.7}
          metalness={0.08}
        />
      </mesh>

      {/* Neck Collar */}
      <mesh
        position={[0, 0.38, 0]}
        receiveShadow
        castShadow
        onPointerDown={handlePointerDown}
        onClick={handlePointerDown}
      >
        <latheGeometry args={[neckProfile, 32]} />
        <meshStandardMaterial
          color={color}
          map={textures.colorMap || undefined}
          bumpMap={textures.bumpMap || undefined}
          bumpScale={0.004}
          roughness={0.7}
          metalness={0.08}
        />
      </mesh>

      {/* Robot Head */}
      <group
        ref={headRef}
        position={[0, 0.6, 0]}
        onPointerDown={handlePointerDown}
        onClick={handlePointerDown}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <mesh
          material={headMat}
          castShadow
          receiveShadow
          onPointerDown={handlePointerDown}
          onClick={handlePointerDown}
        >
          <sphereGeometry args={[0.28, 32, 32, 0, Math.PI * 2, 0, Math.PI]} />
        </mesh>

        <GlassCapsule color={pantallaColor} power={3.5} intensity={pantallaBrillo} />

        {/* Eyes */}
        <group position={[0, -0.02, 0.29]}>
          <RobotEye
            position={[-0.07, 0, 0]}
            rotation={[0, -0.2, 0]}
            scale={1.1}
            blinkDuration={0.4}
            blinkCycle={blinkCycle}
            isLovedRef={isLovedRef}
          />
          <RobotEye
            position={[0.07, 0, 0]}
            rotation={[0, 0.2, 0]}
            scale={1.1}
            blinkDuration={0.4}
            blinkCycle={blinkCycle}
            isLovedRef={isLovedRef}
          />
        </group>

        {/* Ears */}
        <RobotEar position={[-0.29, 0, 0]} isLeft={true} scale={1.3} />
        <RobotEar position={[0.29, 0, 0]} isLeft={false} scale={1.3} />
      </group>
    </group>
  );
}

function RobotGroundShadow({ shadowRef }) {
  const texture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, "rgba(15, 23, 42, 0.45)");
    gradient.addColorStop(0.25, "rgba(15, 23, 42, 0.28)");
    gradient.addColorStop(0.55, "rgba(15, 23, 42, 0.08)");
    gradient.addColorStop(1, "rgba(15, 23, 42, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(canvas);
  }, []);

  if (!texture) return null;

  return (
    <mesh
      ref={shadowRef}
      position={[0, -0.85, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      raycast={() => null}
    >
      <planeGeometry args={[1.5, 1.5]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </mesh>
  );
}

export function RobotCanvas({
  color = "#ffffff",
  pantallaColor = "#a84bff",
  scale = 1.2,
  onReady,
}) {
  const mounted = useMounted();
  const containerRef = useRef(null);
  const shadowRef = useRef(null);
  const [inView, setInView] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);

  // High-performance IntersectionObserver: pauses WebGL rendering loop when off-screen
  // completely free of scroll-event overhead
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setInView(entry.isIntersecting);
      },
      { rootMargin: "150px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted]);

  // Pause rendering when browser tab is inactive (document.hidden) to save 100% idle GPU
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  if (!mounted) {
    return null;
  }

  const shouldRender = inView && isTabVisible;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      role="presentation"
      data-nosnippet="true"
      className="w-full h-full relative"
    >
      <Canvas
        aria-hidden="true"
        role="presentation"
        tabIndex={-1}
        frameloop={shouldRender ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{ position: [0, -0.38, 4.3], fov: 42 }}
        gl={{
          alpha: true,
          powerPreference: "high-performance",
          antialias: true,
          stencil: false,
          depth: true,
        }}
      >
        <ambientLight intensity={0.85} color="#ffffff" />
        <directionalLight
          position={[0, 5, 3]}
          intensity={1.2}
          color="#ffffff"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#ede9fe" />
        <directionalLight position={[4, 2, -3]} intensity={0.6} color="#e0f2fe" />
        <Environment preset="city" />

        <ResponsiveGroup scale={scale}>
          {/* Synchronously moving ground contact shadow locked directly beneath robot body */}
          <RobotGroundShadow shadowRef={shadowRef} />
          <RobotModel
            color={color}
            pantallaColor={pantallaColor}
            shadowRef={shadowRef}
            onReady={onReady}
          />
        </ResponsiveGroup>
      </Canvas>
    </div>
  );
}

export default RobotCanvas;

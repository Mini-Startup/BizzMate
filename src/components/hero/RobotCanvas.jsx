"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

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

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.color.value.set(color);
      materialRef.current.uniforms.power.value = power;
      materialRef.current.uniforms.intensity.value = intensity;
    }
  });

  return (
    <mesh>
      <sphereGeometry args={[0.3, 64, 64, 0, Math.PI * 2, 0, Math.PI]} />
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
        <cylinderGeometry args={[0.04, 0.04, 0.025, 32]} />
      </mesh>

      <mesh
        position={[dir * 0.012, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
        receiveShadow
        material={earRingMat}
      >
        <torusGeometry args={[0.032, 0.008, 16, 32]} />
      </mesh>

      <mesh
        position={[dir * 0.012, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
        receiveShadow
        material={earCenterMat}
      >
        <cylinderGeometry args={[0.03, 0.03, 0.005, 32]} />
      </mesh>

      <group position={[dir * 0.015, 0.035, 0]} rotation={[-0.4, 0, 0]}>
        <mesh
          position={[0, 0.01, 0]}
          castShadow
          receiveShadow
          material={antennaBaseMat}
        >
          <cylinderGeometry args={[0.006, 0.008, 0.02, 16]} />
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
          <sphereGeometry args={[0.007, 16, 16]} />
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
        <tubeGeometry args={[sharedHeartCurve, 64, 0.0035, 8, true]} />
      </mesh>

      <group ref={normalEyesRef}>
        <mesh material={eyeMat}>
          <tubeGeometry args={[topPath, 20, 0.0035, 8, false]} />
        </mesh>
        <mesh material={eyeMat}>
          <tubeGeometry args={[bottomPath, 20, 0.0035, 8, false]} />
        </mesh>
      </group>
    </group>
  );
}

function generatePbrTexturesAsync() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const size = 512;
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

        for (let i = 0; i < 7000; i++) {
          const x = Math.random() * size;
          const y = Math.random() * size;
          const r = 0.5 + Math.random() * 1.5;
          const isDark = Math.random() > 0.3;

          ctxC.beginPath();
          ctxC.arc(x, y, r, 0, Math.PI * 2);
          ctxC.fillStyle = isDark ? "#e2e8f0" : "#ffffff";
          ctxC.fill();

          ctxB.beginPath();
          ctxB.arc(x, y, r, 0, Math.PI * 2);
          ctxB.fillStyle = isDark ? "#404040" : "#ffffff";
          ctxB.fill();
        }
      }

      const texC = new THREE.CanvasTexture(canvasC);
      const texB = new THREE.CanvasTexture(canvasB);
      texC.wrapS = texB.wrapS = THREE.RepeatWrapping;
      texC.wrapT = texB.wrapT = THREE.RepeatWrapping;
      texC.repeat.set(6, 3);
      texB.repeat.set(6, 3);
      texC.needsUpdate = true;
      texB.needsUpdate = true;

      resolve({ colorMap: texC, bumpMap: texB });
    }, 0);
  });
}

function RobotModel({
  color = "#ffffff",
  pantallaColor = "#a84bff",
  pantallaBrillo = 1.3,
  blinkCycle = 3.2,
}) {
  const isLovedRef = useRef(false);
  const timeoutRef = useRef(null);
  const bodyRef = useRef(null);
  const headRef = useRef(null);

  const [textures, setTextures] = useState({ colorMap: null, bumpMap: null });

  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  const config = {
    moveSpeed: 0.12,
    bodyRotSpeed: 2.2,
    headRotSpeed: 4.5,
    bodyTiltX: 0.0,
    bodyTiltY: 0.85,
    headLookX: 0.35,
    headLookY: 1.6,
  };

  useFrame((state, delta) => {
    if (!bodyRef.current || !headRef.current) return;
    const dt = Math.min(delta, 0.1);

    const tx = pointerRef.current.x;
    const ty = pointerRef.current.y;

    const maxMoveX = state.viewport.width / 5;
    const targetPosX = tx * maxMoveX;

    bodyRef.current.position.x = THREE.MathUtils.lerp(
      bodyRef.current.position.x,
      targetPosX,
      config.moveSpeed * dt
    );

    const relativeX = tx - bodyRef.current.position.x / 2.5;
    const bodyTargetRotY = -relativeX * config.bodyTiltY;
    const bodyTargetRotX = -ty * 0.2;
    const bodyTargetRotZ = -relativeX * 0.12;

    bodyRef.current.rotation.y = THREE.MathUtils.lerp(
      bodyRef.current.rotation.y,
      bodyTargetRotY,
      config.bodyRotSpeed * dt
    );
    bodyRef.current.rotation.x = THREE.MathUtils.lerp(
      bodyRef.current.rotation.x,
      bodyTargetRotX,
      config.bodyRotSpeed * dt
    );
    bodyRef.current.rotation.z = THREE.MathUtils.lerp(
      bodyRef.current.rotation.z,
      bodyTargetRotZ,
      config.bodyRotSpeed * dt
    );

    const headTargetRotY = relativeX * config.headLookY;
    const headTargetRotX = -ty * config.headLookX;

    headRef.current.rotation.y = THREE.MathUtils.lerp(
      headRef.current.rotation.y,
      headTargetRotY,
      config.headRotSpeed * dt
    );
    headRef.current.rotation.x = THREE.MathUtils.lerp(
      headRef.current.rotation.x,
      headTargetRotX,
      config.headRotSpeed * dt
    );
  });

  useEffect(() => {
    let mounted = true;
    let generatedMaps = null;

    generatePbrTexturesAsync().then((res) => {
      if (mounted) {
        generatedMaps = res;
        setTextures(res);
      } else {
        res.colorMap.dispose();
        res.bumpMap.dispose();
      }
    });

    return () => {
      mounted = false;
      if (generatedMaps) {
        generatedMaps.colorMap.dispose();
        generatedMaps.bumpMap.dispose();
      }
    };
  }, []);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    isLovedRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isLovedRef.current = false;
    }, 2200);
  };

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

  if (!textures.colorMap) return null;

  return (
    <group
      ref={bodyRef}
      position={[0, -0.35, 0]}
      onPointerDown={handlePointerDown}
      onPointerOver={() => {
        if (typeof document !== "undefined") document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        if (typeof document !== "undefined") document.body.style.cursor = "auto";
      }}
    >
      {/* Robot Torso */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.43, 64, 64, 0, Math.PI * 2, Math.PI * 0.15, Math.PI * 0.85]} />
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
      <mesh position={[0, 0.34, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.235, 0.025, 32, 64]} />
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
      <mesh position={[0, 0.38, 0]} receiveShadow castShadow>
        <latheGeometry args={[neckProfile, 64]} />
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
      >
        <mesh material={headMat} castShadow receiveShadow>
          <sphereGeometry args={[0.28, 64, 64, 0, Math.PI * 2, 0, Math.PI]} />
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

export function RobotCanvas({
  color = "#ffffff",
  pantallaColor = "#a84bff",
  scale = 1.45,
}) {
  return (
    <div className="w-full h-full relative pointer-events-none">
      <Canvas camera={{ position: [0, -0.38, 4.3], fov: 42 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.85} color="#ffffff" />
        <directionalLight
          position={[0, 5, 3]}
          intensity={1.2}
          color="#ffffff"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#ede9fe" />
        <directionalLight position={[4, 2, -3]} intensity={0.6} color="#e0f2fe" />
        <Environment preset="city" />

        <ResponsiveGroup scale={scale}>
          <ContactShadows
            position={[0, -0.85, 0]}
            opacity={0.35}
            scale={8}
            resolution={512}
            blur={1.8}
            far={2.5}
            color="#0f172a"
          />
          <RobotModel color={color} pantallaColor={pantallaColor} />
        </ResponsiveGroup>
      </Canvas>
    </div>
  );
}

export default RobotCanvas;

import * as THREE from 'three'
import React, { Suspense, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, OrbitControls, useGLTF } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

const MODEL_URL = '/BatteryHomePage1%201.glb'
const CAMERA_ANIMATION_SECONDS = 4

type GLTFResult = {
  nodes: {
    BATTERY_HANDLE002: THREE.Mesh
    BATTERY_HANDLE003: THREE.Mesh
    BATTERY_HANDLESCREW004: THREE.Mesh
    BATTERY_HANDLESCREW005: THREE.Mesh
    BATTERY_HANDLESCREW006: THREE.Mesh
    BATTERY_HANDLESCREW007: THREE.Mesh
    BATTERY_SHELL001: THREE.Mesh
    BATTERY_TAP006: THREE.Mesh
    BATTERY_TAP007: THREE.Mesh
    BATTERY_TAP008: THREE.Mesh
    BATTERY_TAP009: THREE.Mesh
    BATTERY_TAP010: THREE.Mesh
    BATTERY_TAP011: THREE.Mesh
    BATTERY_TOPCOVER001: THREE.Mesh
    Cube001: THREE.Mesh
    Cube004: THREE.Mesh
    Cylinder004: THREE.Mesh
    Cylinder005: THREE.Mesh
  }
  materials: {
    ['Material.010']: THREE.MeshStandardMaterial
    ['Material.011']: THREE.MeshStandardMaterial
    ['Material.013']: THREE.MeshStandardMaterial
    ['Material.018']: THREE.MeshStandardMaterial
    ['Material.012']: THREE.MeshStandardMaterial
    ['Material.014']: THREE.MeshStandardMaterial
    ['Material.001']: THREE.MeshStandardMaterial
    ['Material.009']: THREE.MeshStandardMaterial
    ['Material.008']: THREE.MeshStandardMaterial
    ['Material.007']: THREE.MeshStandardMaterial
    ['Material.006']: THREE.MeshStandardMaterial
    ['Material.005']: THREE.MeshStandardMaterial
    ['Material.004']: THREE.MeshStandardMaterial
    ['Material.002']: THREE.MeshStandardMaterial
    ['Material.020']: THREE.MeshStandardMaterial
    ['Material.016']: THREE.MeshStandardMaterial
  }
}

function BatteryModel(props: React.ComponentProps<'group'>) {
  const { nodes, materials } = useGLTF(MODEL_URL) as unknown as GLTFResult
  const terminalMaterial = useMemo(() => {
    const material = materials['Material.016'].clone()
    material.color = new THREE.Color('#ffac00')
    material.emissive = new THREE.Color('#ffac00')
    material.emissiveIntensity = 3.5
    return material
  }, [materials])

  const sharedShadowProps = { castShadow: true, receiveShadow: true }

  return (
    <group {...props} dispose={null} position={[0.268, -0.927, 0.005]} rotation={[0, Math.PI / 2, 0]}>
      <group position={[-0.268, 0.927, -0.005]} scale={2.24}>
        <mesh {...sharedShadowProps} geometry={nodes.BATTERY_HANDLE002.geometry} material={materials['Material.010']} position={[0.579, 0.352, -0.005]} rotation={[3.142, 0, -3.116]} scale={8.056} />
        <mesh {...sharedShadowProps} geometry={nodes.BATTERY_HANDLE003.geometry} material={materials['Material.011']} position={[-0.325, 0.353, -0.005]} rotation={[0, 0, 0.027]} scale={8.056} />
        <mesh {...sharedShadowProps} geometry={nodes.BATTERY_HANDLESCREW004.geometry} material={materials['Material.013']} position={[0.517, 0.328, -0.223]} rotation={[-1.571, 0, 0]} scale={8.056} />
        <mesh {...sharedShadowProps} geometry={nodes.BATTERY_HANDLESCREW005.geometry} material={materials['Material.018']} position={[-0.265, 0.329, -0.223]} rotation={[-1.571, 0, 0]} scale={8.056} />
        <mesh {...sharedShadowProps} geometry={nodes.BATTERY_HANDLESCREW006.geometry} material={materials['Material.012']} position={[0.519, 0.337, 0.211]} rotation={[-1.571, 0, -Math.PI]} scale={8.056} />
        <mesh {...sharedShadowProps} geometry={nodes.BATTERY_HANDLESCREW007.geometry} material={materials['Material.014']} position={[-0.265, 0.339, 0.211]} rotation={[-1.571, 0, -Math.PI]} scale={8.056} />
        <mesh {...sharedShadowProps} geometry={nodes.BATTERY_SHELL001.geometry} material={materials['Material.001']} position={[0.126, -0.049, -0.324]} rotation={[3.142, 0, 0]} scale={8.056} />
        <mesh {...sharedShadowProps} geometry={nodes.BATTERY_TAP006.geometry} material={materials['Material.009']} position={[0.646, 0.361, -0.094]} rotation={[-1.571, 0, -Math.PI]} scale={8.056} />
        <mesh {...sharedShadowProps} geometry={nodes.BATTERY_TAP007.geometry} material={materials['Material.008']} position={[0.485, 0.361, -0.094]} rotation={[-1.571, 0, -Math.PI]} scale={8.056} />
        <mesh {...sharedShadowProps} geometry={nodes.BATTERY_TAP008.geometry} material={materials['Material.007']} position={[0.324, 0.361, -0.094]} rotation={[-1.571, 0, -Math.PI]} scale={8.056} />
        <mesh {...sharedShadowProps} geometry={nodes.BATTERY_TAP009.geometry} material={materials['Material.006']} position={[-0.063, 0.361, -0.094]} rotation={[-1.571, 0, -Math.PI]} scale={8.056} />
        <mesh {...sharedShadowProps} geometry={nodes.BATTERY_TAP010.geometry} material={materials['Material.005']} position={[-0.225, 0.361, -0.094]} rotation={[-1.571, 0, -Math.PI]} scale={8.056} />
        <mesh {...sharedShadowProps} geometry={nodes.BATTERY_TAP011.geometry} material={materials['Material.004']} position={[-0.386, 0.361, -0.094]} rotation={[-1.571, 0, -Math.PI]} scale={8.056} />
        <mesh {...sharedShadowProps} geometry={nodes.BATTERY_TOPCOVER001.geometry} material={materials['Material.002']} position={[0.13, 0.241, -0.006]} rotation={[1.571, 0, Math.PI / 2]} scale={8.056} />
        <mesh {...sharedShadowProps} geometry={nodes.Cube001.geometry} material={terminalMaterial} position={[-0.407, 0.297, 0.284]} rotation={[Math.PI, 0, Math.PI]} scale={[-0.117, -0.003, -0.007]} />
        <mesh {...sharedShadowProps} geometry={nodes.Cube004.geometry} material={terminalMaterial} position={[0.661, 0.297, 0.284]} rotation={[Math.PI, 0, Math.PI]} scale={[-0.117, -0.003, -0.007]} />
        <mesh {...sharedShadowProps} geometry={nodes.Cylinder004.geometry} material={terminalMaterial} position={[0.679, 0.367, 0.233]} scale={0.05} />
        <mesh {...sharedShadowProps} geometry={nodes.Cylinder005.geometry} material={terminalMaterial} position={[-0.431, 0.367, 0.233]} scale={0.05} />
      </group>
    </group>
  )
}

function CameraRig({ controlsRef }: { controlsRef: React.MutableRefObject<OrbitControlsImpl | null> }) {
  const [controlsEnabled, setControlsEnabled] = useState(false)
  const startPosition = useMemo(() => new THREE.Vector3(8, 6, 10), [])
  const endPosition = useMemo(() => new THREE.Vector3(12, 2, 5), [])
  const target = useMemo(() => new THREE.Vector3(0, 0, 0), [])

  useFrame(({ camera, clock }) => {
    const elapsed = clock.getElapsedTime()
    const t = Math.min(elapsed / CAMERA_ANIMATION_SECONDS, 1)
    const eased = THREE.MathUtils.smootherstep(t, 0, 1)
    const position = new THREE.Vector3().lerpVectors(startPosition, endPosition, eased)
    camera.position.copy(position)
    camera.lookAt(target)
    if (controlsRef.current) {
      controlsRef.current.target.copy(target)
      controlsRef.current.update()
    }

    if (t >= 1 && !controlsEnabled) {
      setControlsEnabled(true)
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enabled={controlsEnabled}
      enableZoom={false}
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.4}
      minPolarAngle={Math.PI / 2 - 0.6}
      maxPolarAngle={Math.PI / 2 + 0.45}
      minAzimuthAngle={-0.7}
      maxAzimuthAngle={0.7}
    />
  )
}

type CinematicBatteryProps = {
  className?: string
}

export default function CinematicBattery({ className }: CinematicBatteryProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null)

  return (
    <div className={className ?? 'relative flex min-h-[85vh] w-full items-center justify-center bg-black'}>
      <Canvas
        shadows
        camera={{ position: [8, 6, 10], fov: 28 }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.12} />
        <pointLight position={[2, 3, 2]} intensity={2.2} color="#ffac00" distance={12} />
        <directionalLight position={[-4, 3, -2]} intensity={0.7} color="#ffffff" />

        <Suspense fallback={null}>
          <BatteryModel />
        </Suspense>

        <ContactShadows position={[0, -0.35, 0]} opacity={0.45} blur={2.4} scale={7} />
        <CameraRig controlsRef={controlsRef} />
      </Canvas>
    </div>
  )
}

useGLTF.preload(MODEL_URL)

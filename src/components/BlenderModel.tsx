import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    BATTERY_HANDLE004: THREE.Mesh
    BATTERY_HANDLE005: THREE.Mesh
    BATTERY_HANDLESCREW008: THREE.Mesh
    BATTERY_HANDLESCREW009: THREE.Mesh
    BATTERY_HANDLESCREW010: THREE.Mesh
    BATTERY_HANDLESCREW011: THREE.Mesh
    BATTERY_SHELL002: THREE.Mesh
    BATTERY_TAP012: THREE.Mesh
    BATTERY_TAP013: THREE.Mesh
    BATTERY_TAP014: THREE.Mesh
    BATTERY_TAP015: THREE.Mesh
    BATTERY_TAP016: THREE.Mesh
    BATTERY_TAP017: THREE.Mesh
    BATTERY_TOPCOVER002: THREE.Mesh
    Plane002: THREE.Mesh
    Plane001: THREE.Mesh
    Cylinder007: THREE.Mesh
    Cylinder006: THREE.Mesh
    Cube006: THREE.Mesh
    Cube005: THREE.Mesh
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
    ['Material.019']: THREE.MeshPhysicalMaterial
    ['Material.016']: THREE.MeshStandardMaterial
    ['Material.020']: THREE.MeshStandardMaterial
  }
  animations: THREE.AnimationClip[]
}

export function Model(props: React.ComponentProps<'group'>) {
  const { nodes, materials } = useGLTF('/HomePageB1.glb') as unknown as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group position={[141.935, 0.019, 26.968]} rotation={[3.142, 0, 0]} scale={18.041}>
        <mesh geometry={nodes.BATTERY_HANDLE004.geometry} material={materials['Material.010']} position={[-7.2, -0.096, 1.397]} rotation={[0, 0, -3.116]} />
        <mesh geometry={nodes.BATTERY_HANDLE005.geometry} material={materials['Material.011']} position={[-7.313, -0.096, 1.397]} rotation={[Math.PI, 0, 0.027]} />
        <mesh geometry={nodes.BATTERY_HANDLESCREW008.geometry} material={materials['Material.013']} position={[-7.208, -0.093, 1.424]} rotation={[Math.PI / 2, 0, 0]} />
        <mesh geometry={nodes.BATTERY_HANDLESCREW009.geometry} material={materials['Material.018']} position={[-7.305, -0.093, 1.424]} rotation={[Math.PI / 2, 0, 0]} />
        <mesh geometry={nodes.BATTERY_HANDLESCREW010.geometry} material={materials['Material.012']} position={[-7.208, -0.094, 1.371]} rotation={[Math.PI / 2, 0, -Math.PI]} />
        <mesh geometry={nodes.BATTERY_HANDLESCREW011.geometry} material={materials['Material.014']} position={[-7.305, -0.094, 1.371]} rotation={[Math.PI / 2, 0, -Math.PI]} />
        <mesh geometry={nodes.BATTERY_SHELL002.geometry} material={materials['Material.001']} position={[-7.257, -0.046, 1.437]} />
        <mesh geometry={nodes.BATTERY_TAP012.geometry} material={materials['Material.009']} position={[-7.192, -0.097, 1.409]} rotation={[Math.PI / 2, 0, -Math.PI]} />
        <mesh geometry={nodes.BATTERY_TAP013.geometry} material={materials['Material.008']} position={[-7.212, -0.097, 1.409]} rotation={[Math.PI / 2, 0, -Math.PI]} />
        <mesh geometry={nodes.BATTERY_TAP014.geometry} material={materials['Material.007']} position={[-7.232, -0.097, 1.409]} rotation={[Math.PI / 2, 0, -Math.PI]} />
        <mesh geometry={nodes.BATTERY_TAP015.geometry} material={materials['Material.006']} position={[-7.28, -0.097, 1.409]} rotation={[Math.PI / 2, 0, -Math.PI]} />
        <mesh geometry={nodes.BATTERY_TAP016.geometry} material={materials['Material.005']} position={[-7.3, -0.097, 1.409]} rotation={[Math.PI / 2, 0, -Math.PI]} />
        <mesh geometry={nodes.BATTERY_TAP017.geometry} material={materials['Material.004']} position={[-7.32, -0.097, 1.409]} rotation={[Math.PI / 2, 0, -Math.PI]} />
        <mesh geometry={nodes.BATTERY_TOPCOVER002.geometry} material={materials['Material.002']} position={[-7.256, -0.082, 1.398]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
      </group>
      <mesh geometry={nodes.Plane002.geometry} material={materials['Material.019']} position={[49.711, 0.04, -29.485]} scale={[52.272, 3.366, 63.94]} />
      <mesh geometry={nodes.Plane001.geometry} material={materials['Material.019']} position={[65.164, 0.033, -10.399]} rotation={[Math.PI / 2, 0, 0.391]} scale={[52.272, 3.366, 63.94]} />
      <mesh geometry={nodes.Cylinder007.geometry} material={materials['Material.016']} position={[9.77, 1.783, 2.288]} scale={0.113} />
      <mesh geometry={nodes.Cylinder006.geometry} material={materials['Material.016']} position={[12.257, 1.782, 2.288]} scale={0.113} />
      <mesh geometry={nodes.Cube006.geometry} material={materials['Material.020']} position={[12.217, 1.627, 2.402]} rotation={[-Math.PI, 0, -Math.PI]} scale={[-0.263, -0.006, -0.015]} />
      <mesh geometry={nodes.Cube005.geometry} material={materials['Material.020']} position={[9.824, 1.627, 2.402]} rotation={[-Math.PI, 0, -Math.PI]} scale={[-0.263, -0.006, -0.015]} />
    </group>
  )
}

useGLTF.preload('/HomePageB1.glb')

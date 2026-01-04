'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { shaderMaterial, useTrailTexture } from '@react-three/drei'
import { useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { useTheme } from 'next-themes'

const DotMaterial = shaderMaterial(
  {
    time: 0,
    resolution: new THREE.Vector2(),
    dotColor: new THREE.Color('#ffffff'),
    bgColor: new THREE.Color('#121212'),
    mouseTrail: null,
    gridSize: 50,
    dotOpacity: 0.05,
    rotation: 0
  },
  `void main(){ gl_Position = vec4(position.xy,0.,1.); }`,
  `uniform float time;
   uniform vec2 resolution;
   uniform vec3 dotColor;
   uniform vec3 bgColor;
   uniform sampler2D mouseTrail;
   uniform float gridSize;
   uniform float dotOpacity;
   uniform float rotation;
   vec2 rotate(vec2 uv,float a){float s=sin(a);float c=cos(a);return mat2(c,-s,s,c)*(uv-0.5)+0.5;}
   vec2 coverUv(vec2 uv){vec2 s=resolution.xy/max(resolution.x,resolution.y);return clamp((uv-0.5)*s+0.5,0.,1.);}
   float sdfCircle(vec2 p,float r){return length(p-0.5)-r;}
   void main(){
     vec2 uv=coverUv(gl_FragCoord.xy/resolution);
     vec2 ruv=rotate(uv,rotation);
     vec2 guv=fract(ruv*gridSize);
     vec2 center=(floor(ruv*gridSize)+0.5)/gridSize;
     center=rotate(center,-rotation);
     float m=texture2D(mouseTrail,center).r;
     float s=sdfCircle(guv,0.25*(1.+m*0.5));
     float d=smoothstep(0.05,0.,s);
     gl_FragColor=vec4(mix(bgColor,dotColor,d*dotOpacity*(1.+m*0.5)),1.);
   }`
)

function Scene() {
  const size = useThree((s) => s.size)
  const viewport = useThree((s) => s.viewport)
  const { theme } = useTheme()
  const rotation = 0
  const gridSize = 100

  const [trail, onMove] = useTrailTexture({ size: 512, radius: 0.1, maxAge: 400, interpolate: 1 })

  const dotMaterial = useMemo(() => new DotMaterial(), [])

  useEffect(() => {
    const colors = theme === 'light'
      ? { dotColor: '#e1e1e1', bgColor: '#f4f5f5', dotOpacity: 0.15 }
      : { dotColor: '#ffffff', bgColor: '#121212', dotOpacity: 0.025 }
    dotMaterial.uniforms.dotColor.value.set(colors.dotColor)
    dotMaterial.uniforms.bgColor.value.set(colors.bgColor)
    dotMaterial.uniforms.dotOpacity.value = colors.dotOpacity
  }, [theme, dotMaterial])

  useFrame((state) => { dotMaterial.uniforms.time.value = state.clock.elapsedTime })

  const handleMove = (e) => { onMove(e) }

  const scale = Math.max(viewport.width, viewport.height) / 2

  return (
    <mesh scale={[scale, scale, 1]} onPointerMove={handleMove}>
      <planeGeometry args={[2, 2]} />
      <primitive
        object={dotMaterial}
        resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
        rotation={rotation}
        gridSize={gridSize}
        mouseTrail={trail}
      />
    </mesh>
  )
}

export default function DotShader() {
  return (
    <Canvas gl={{ antialias: true, powerPreference: 'high-performance' }}>
      <Scene />
    </Canvas>
  )
}
'use client'

import { DotScreenShader } from '../js/dot-shader'

export default function DotShader() {
  return <DotScreenShader />
}


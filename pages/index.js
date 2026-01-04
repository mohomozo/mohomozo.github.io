'use client'

import { useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { shaderMaterial, useTrailTexture } from '@react-three/drei'

import '../styles/globals.css'

// --- Dot Shader Material ---
const DotMaterial = shaderMaterial(
  {
    time: 0,
    resolution: new THREE.Vector2(),
    dotColor: new THREE.Color('#FFFFFF'),
    bgColor: new THREE.Color('#121212'),
    mouseTrail: null,
    render: 0,
    rotation: 0,
    gridSize: 50,
    dotOpacity: 0.05
  },
  `void main() { gl_Position = vec4(position.xy,0.,1.); }`,
  `uniform float time;
   uniform int render;
   uniform vec2 resolution;
   uniform vec3 dotColor;
   uniform vec3 bgColor;
   uniform sampler2D mouseTrail;
   uniform float rotation;
   uniform float gridSize;
   uniform float dotOpacity;

   vec2 rotate(vec2 uv,float angle){float s=sin(angle);float c=cos(angle);return mat2(c,-s,s,c)*(uv-0.5)+0.5;}
   vec2 coverUv(vec2 uv){vec2 s=resolution.xy/max(resolution.x,resolution.y);return clamp((uv-0.5)*s+0.5,0.,1.);}
   float sdfCircle(vec2 p,float r){return length(p-0.5)-r;}

   void main(){
     vec2 uv=coverUv(gl_FragCoord.xy/resolution);
     vec2 rotatedUv=rotate(uv,rotation);
     vec2 gridUv=fract(rotatedUv*gridSize);
     vec2 gridUvCenterInScreenCoords=rotate((floor(rotatedUv*gridSize)+0.5)/gridSize,-rotation);
     float baseDot=sdfCircle(gridUv,0.25);
     float mouseInfluence=texture2D(mouseTrail,gridUvCenterInScreenCoords).r;
     float scaleInfluence=max(mouseInfluence*0.5,sin(time*2.+length(uv-vec2(0.7,1.1))*10.)*0.3);
     float dotSize=min(pow(length(uv-vec2(0.7,1.1)),2.)*0.3,0.3);
     float sdfDot=sdfCircle(gridUv,dotSize*(1.+scaleInfluence*0.5));
     float smoothDot=smoothstep(0.05,0.,sdfDot);
     vec3 comp=mix(bgColor,dotColor,smoothDot*dotOpacity*(1.+mouseInfluence*50.));
     gl_FragColor=vec4(comp,1.);
   }`
)

function DotCanvas() {
  const size = useThree((s) => s.size)
  const viewport = useThree((s) => s.viewport)
  const [material] = useState(() => new DotMaterial())
  const [trail, onMove] = useTrailTexture({ size: 512, radius: 0.1, maxAge: 400, interpolate: 1 })

  useFrame((state) => { material.uniforms.time.value = state.clock.elapsedTime })

  const handlePointerMove = (e) => onMove(e)

  const scale = Math.max(viewport.width, viewport.height) / 2

  return (
    <mesh scale={[scale, scale, 1]} onPointerMove={handlePointerMove}>
      <planeGeometry args={[2, 2]} />
      <primitive
        object={material}
        resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
        mouseTrail={trail}
      />
    </mesh>
  )
}

// --- Main Page ---
export default function Home() {
  const [activePanel, setActivePanel] = useState('home')
  const panels = ['home', 'about', 'portfolio', 'work']

  return (
    <div className="app">
      <header className="hero">
        <video id="heroVideo" autoPlay muted loop playsInline src="/assets/loop.mp4" className="hero-video" />
        <div className="hero-overlay" />
        <div className="hero-text">
          <h1>MOHOMOZO</h1>
          <p style={{ fontSize: '0.8rem' }}>Mohammad Mozafari</p>
          <p>Experimental Multimedia Artist</p>
        </div>
        <Canvas className="dot-canvas"><DotCanvas /></Canvas>
      </header>

      <nav className="main-nav">
        {panels.map((p) => (
          <button key={p} className={activePanel === p ? 'active' : ''} onClick={() => setActivePanel(p)}>
            {p.toUpperCase()}
          </button>
        ))}
      </nav>

      <main>
        <section className={`panel ${activePanel === 'home' ? 'active' : ''}`}>
          <h2>Home</h2>
          <p>Exploring the intersection of animation, video, and conceptual art.</p>
        </section>
        <section className={`panel ${activePanel === 'about' ? 'active' : ''}`}>
          <h2>About Me</h2>
          <p>Mohammad Mozafari is an experimental multimedia artist whose practice spans animation, theater-based video production, painting, and sculpture.</p>
        </section>
        <section className={`panel ${activePanel === 'portfolio' ? 'active' : ''}`}>
          <h2>Portfolio</h2>
          <div id="portfolio-grid"></div>
        </section>
        <section className={`panel ${activePanel === 'work' ? 'active' : ''}`}>
          <h2>Ongoing Projects</h2>
          <div id="wip-grid"></div>
        </section>
      </main>
    </div>
  )
}

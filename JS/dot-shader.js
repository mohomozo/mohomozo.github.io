import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';

const canvas = document.getElementById('dotCanvas');
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1,1,1,-1,0,1);

const renderer = new THREE.WebGLRenderer({ canvas, alpha:true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);

const material = new THREE.ShaderMaterial({
  uniforms:{
    time:{ value:0 },
    resolution:{ value:new THREE.Vector2(innerWidth,innerHeight) }
  },
  vertexShader:`void main(){gl_Position=vec4(position,1.0);}`,
  fragmentShader:`
    uniform float time;
    uniform vec2 resolution;

    void main(){
      vec2 uv = gl_FragCoord.xy / resolution;
      vec2 g = fract(uv*90.0);
      float d = length(g-0.5);
      float m = smoothstep(0.25,0.23,d);
      float pulse = sin(time+uv.y*8.0)*0.04;
      vec3 col = vec3(1.0)*(m*0.12+pulse);
      gl_FragColor = vec4(col,1.0);
    }
  `
});

const quad = new THREE.Mesh(new THREE.PlaneGeometry(2,2), material);
scene.add(quad);

addEventListener('resize',()=>{
  renderer.setSize(innerWidth,innerHeight);
  material.uniforms.resolution.value.set(innerWidth,innerHeight);
});

function animate(t){
  material.uniforms.time.value = t*0.001;
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}
animate();

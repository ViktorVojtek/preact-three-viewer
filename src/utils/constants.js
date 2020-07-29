import {
  Scene,
  Raycaster,
  PerspectiveCamera,
  WebGLRenderer,
  Vector2,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const cameraPosStart = { x: 1.5, y: 2, z: 2 };
export const cameraPosChange = { x: 0, y: 1, z: 3 };
export const scene = new Scene();
export const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
export const renderer = new WebGLRenderer({
  antialias: true,
  alpha: true,
  preserveDrawingBuffer: true,
});
export const controls = new OrbitControls(camera, renderer.domElement);
export const raycaster = new Raycaster();
export const mouse = new Vector2();

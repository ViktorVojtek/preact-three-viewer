import {
  Scene,
  Raycaster,
  PerspectiveCamera,
  WebGLRenderer,
  Vector2,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export type cameraPos = {
  x: number;
  y: number;
  z: number;
};

export const vendor: string = 'javorina';
export const cameraPosStart: cameraPos = { x: 1.5, y: 2, z: 2 };
export const cameraPosChange: cameraPos = { x: 0, y: 1, z: 3 };
export const scene: Scene = new Scene();
export const camera: PerspectiveCamera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
export const renderer: WebGLRenderer = new WebGLRenderer({
  antialias: true,
  alpha: true,
  preserveDrawingBuffer: true,
});
export const controls: OrbitControls = new OrbitControls(
  camera,
  renderer.domElement
);
export const raycaster: Raycaster = new Raycaster();
export const mouse: Vector2 = new Vector2();

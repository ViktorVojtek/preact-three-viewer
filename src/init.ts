import {
  scene,
  camera,
  cameraPosStart,
  controls,
  renderer,
} from './utils/constants';
import {
  PCFSoftShadowMap,
  LinearEncoding,
  LinearToneMapping,
  Object3D,
} from 'three';
import Lights from './components/Lights';
import Ground from './components/Ground';
import {
  animate,
  onDocumentMouseDown,
  onDocumentTouchDown,
  onWindowResize,
} from './utils';

export default function (): void {
  // CAMERA SET UP
  camera.near = 1;
  camera.position.set(cameraPosStart.x, cameraPosStart.y, cameraPosStart.z);
  camera.lookAt(scene.position);
  // END

  // CONTROLS SETTINGS
  controls.maxPolarAngle = Math.PI / 2.1;
  controls.minDistance = 2.25;
  controls.addEventListener('change', animate);
  // END

  // RENDERER SET UP
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0xffffff, 1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;

  renderer.outputEncoding = LinearEncoding;
  renderer.toneMapping = LinearToneMapping;
  renderer.toneMappingExposure = 0.69;

  renderer.autoClear = true;
  renderer.physicallyCorrectLights = true;

  const lights: Object3D = Lights();
  const ground: Object3D = Ground();

  scene.add(lights);
  scene.add(ground);

  document.getElementById('App').appendChild(renderer.domElement);

  renderer.domElement.addEventListener('click', onDocumentMouseDown, false);
  renderer.domElement.addEventListener(
    'touchstart',
    onDocumentTouchDown,
    false
  );
  window.addEventListener('resize', onWindowResize, false);

  // END
}

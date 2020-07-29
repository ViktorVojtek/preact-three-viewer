import { AmbientLight, HemisphereLight, DirectionalLight, Group } from 'three';

export default function () {
  var ambientLight = new AmbientLight(0xfff4e5, 1.25);
  var hemisphereLight = new HemisphereLight(0xfff4e5, 0xaaaaaa, 3.5);
  var directionalLight = new DirectionalLight(0xffffff, 0.5);

  directionalLight.castShadow = true;
  directionalLight.position.set(1, 5, 1.5);
  directionalLight.shadow.mapSize.width = 4096;
  directionalLight.shadow.mapSize.height = 4096;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  directionalLight.shadow.camera.left = -5;
  directionalLight.shadow.camera.right = 5;
  directionalLight.shadow.camera.top = 5;
  directionalLight.shadow.camera.bottom = -5;

  var group = new Group();

  group.name = 'Lights';
  group.add(ambientLight);
  group.add(hemisphereLight);
  group.add(directionalLight);

  return group;
}

import { PlaneBufferGeometry, ShadowMaterial, Color, Mesh } from 'three';

export default function (): Mesh<PlaneBufferGeometry, ShadowMaterial> {
  var geometry: PlaneBufferGeometry = new PlaneBufferGeometry(5, 20, 32);
  var material: ShadowMaterial = new ShadowMaterial();

  material.transparent = true;
  material.opacity = 0.3;
  material.color = new Color(0xeeeeee);

  var plane: Mesh<PlaneBufferGeometry, ShadowMaterial> = new Mesh(
    geometry,
    material
  );

  plane.name = 'Ground';
  plane.position.set(0, 0, 0);
  plane.receiveShadow = true;
  plane.rotation.x = -Math.PI / 2;

  // plane.callback = function () { console.log(this.name); };

  return plane;
}

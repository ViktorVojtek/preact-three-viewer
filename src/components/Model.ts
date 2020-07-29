import {
  Group,
  Sprite,
  SpriteMaterial,
  MeshPhysicalMaterial,
  ObjectLoader,
  Object3D,
  TextureLoader,
  Texture,
} from 'three';
import { useStore } from '../utils/store';

function MaterialIcon(): Sprite {
  const { dispatch } = useStore();

  const spriteMap: Texture = new TextureLoader().load(
    '../static/images/info.png'
  );
  const spriteMaterial: SpriteMaterial = new SpriteMaterial({ map: spriteMap });
  const sprite: Sprite = new Sprite(spriteMaterial);

  sprite.name = 'Icon';
  sprite.position.set(0.65, 1.35, -0.05);
  sprite.scale.set(0.25, 0.25, 0.25);

  (sprite as any).callback = () => {
    dispatch({ type: 'TOGGLE_MENU', payload: true });
  };

  return sprite;
}

export default function (model: any): Promise<Object3D> {
  const { dispatch } = useStore();
  const traverseObject = (obj: Object3D, mat: MeshPhysicalMaterial) => {
    obj.traverse((child) => {
      if (child) {
        (child as any).material = mat;
        (child as any).material.needsUpdate = true;
        child.castShadow = true;
      }
    });

    return obj;
  };

  return new Promise(function (resolve, reject) {
    var objLoader: ObjectLoader = new ObjectLoader();

    const textureLoader: TextureLoader = new TextureLoader();
    const materialIcon: Sprite = MaterialIcon();
    const group: Group = new Group();

    const onLoaded = (object: Object3D) => {
      object.position.set(
        model.position[0],
        model.position[1],
        model.position[2]
      );
      object.scale.set(model.scale, model.scale, model.scale);
      object.name = model.titleID;
      object.castShadow = true;

      textureLoader.load(
        model.texture.map,
        (texture: Texture) => {
          const material: MeshPhysicalMaterial = new MeshPhysicalMaterial({
            map: texture,
            roughness: 0.25,
            reflectivity: 0.75,
          });

          const updatedObject: Object3D = traverseObject(object, material);

          updatedObject.castShadow = true;

          group.name = `Group - ${model.titleID}`;
          group.add(materialIcon);
          group.add(updatedObject);

          const { id } = updatedObject;

          dispatch({ type: 'SET_OBJECT_ID', payload: id });

          resolve(group);
        },
        (error) => {
          reject(error);
        }
      );
    };

    const onProgress: (xhr: ProgressEvent<EventTarget>) => void = function (
      xhr
    ) {
      var percentage: number = +Math.round(
        (xhr.loaded / xhr.total) * 100
      ).toFixed(0);

      if (percentage === 100) {
        dispatch({ type: 'SET_PROGRESS', payload: 0 });
        dispatch({ type: 'SET_LOADED', payload: true });
      } else {
        dispatch({ type: 'SET_PROGRESS', payload: percentage });
        dispatch({ type: 'SET_LOADED', payload: false });
      }
    };

    const onError: (error: Error | ErrorEvent) => void = function (error) {
      console.log(error);
    };

    objLoader.load(model.path, onLoaded, onProgress, onError);
  });
}

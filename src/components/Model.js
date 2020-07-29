import {
  Group,
  Sprite,
  SpriteMaterial,
  MeshPhysicalMaterial,
  ObjectLoader,
  TextureLoader,
} from 'three';
import { useStore } from '../utils/store';

function MaterialIcon() {
  const { dispatch } = useStore();

  const spriteMap = new TextureLoader().load('../static/images/info.png');
  const spriteMaterial = new SpriteMaterial({ map: spriteMap });
  const sprite = new Sprite(spriteMaterial);

  sprite.name = 'Icon';
  sprite.position.set(0.65, 1.35, -0.05);
  sprite.scale.set(0.25, 0.25, 0.25);

  sprite.callback = () => {
    dispatch({ type: 'TOGGLE_MENU', payload: true });
  };

  return sprite;
}

export default (model) => {
  const { dispatch } = useStore();
  const traverseObject = (obj, mat) => {
    obj.traverse((child) => {
      if (child) {
        child.material = mat;
        child.material.needsUpdate = true;
        child.castShadow = true;
      }
    });

    return obj;
  };

  return new Promise(function (resolve, reject) {
    var objLoader = new ObjectLoader();

    const textureLoader = new TextureLoader();
    const materialIcon = MaterialIcon();
    const group = new Group();

    const onLoaded = (object) => {
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
        (texture) => {
          const material = new MeshPhysicalMaterial({
            map: texture,
            roughness: 0.25,
            reflectivity: 0.75,
          });

          const updatedObject = traverseObject(object, material);

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

    const onProgress = function (xhr) {
      var percentage = +Math.round((xhr.loaded / xhr.total) * 100).toFixed(0);

      if (percentage === 100) {
        dispatch({ type: 'SET_PROGRESS', payload: 0 });
        dispatch({ type: 'SET_LOADED', payload: true });
      } else {
        dispatch({ type: 'SET_PROGRESS', payload: percentage });
        dispatch({ type: 'SET_LOADED', payload: false });
      }
    };

    const onError = function (error) {
      reject(error);
    };

    objLoader.load(model.path, onLoaded, onProgress, onError);
  });
};

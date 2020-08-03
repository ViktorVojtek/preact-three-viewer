import { useEffect } from 'react';
import { Object3D } from 'three';
import {
  camera,
  cameraPosStart,
  cameraPosChange,
  controls,
  mouse,
  raycaster,
  renderer,
  scene,
} from './constants';
import Model from '../components/Model';
import { useStore } from './store';
import { vendor } from './constants';

export function animate(): void {
  // requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

export const useModels: (models: any, objIdx: number) => void = (
  models,
  objIdx
) => {
  const { state, dispatch } = useStore();
  const { currentModelName, matIdx } = state;

  useEffect(() => {
    (async function () {
      try {
        if (models.length < 1) {
          const modelItems = await fetchObjects(`./${vendor}/data.json`);

          dispatch({ type: 'SET_MODELS', payload: modelItems });
        } else {
          const currentMenuItems: any[] = [...models[objIdx].matThumbs];

          dispatch({ type: 'SET_MENU_ITEMS', payload: currentMenuItems });

          const activeModelName: string = `Group - ${models[objIdx].vendor}: ${models[objIdx].title}`;

          if (activeModelName !== currentModelName) {
            const modelData = {
              path: models[objIdx].model[0],
              position: models[objIdx].position,
              scale: models[objIdx].scale,
              texture: {
                map: models[objIdx].textures[matIdx].map,
              },
              titleID: `${models[objIdx].vendor}: ${models[objIdx].title}`,
            };

            const objectExist: Object3D = scene.getObjectByName(
              currentModelName
            );

            if (!objectExist) {
              const model: Object3D = await Model(modelData);

              scene.add(model);
            } else {
              objectExist.visible = false;
              animate();

              const activeExistInObjects: Object3D = scene.getObjectByName(
                activeModelName
              );

              if (activeExistInObjects) {
                activeExistInObjects.visible = true;
              } else {
                const model: Object3D = await Model(modelData);

                scene.add(model);
              }
            }

            dispatch({
              type: 'SET_CURRENT_MODEL_NAME',
              payload: activeModelName,
            });
          }

          animate();
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [models, objIdx]);
};

export function fetchObjects(url: string): Promise<any> {
  return new Promise(async function (resolve, reject) {
    var response = await fetch(url);
    var data = await response.json();

    resolve(data);
  });
}

export function onDocumentMouseDown(event: MouseEvent): void {
  event.preventDefault();
  const { dispatch } = useStore();

  mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    dispatch({ type: 'TOGGLE_MENU', payload: false });

    if (
      (intersects[0].object as any).callback &&
      typeof (intersects[0].object as any).callback === 'function'
    ) {
      (intersects[0].object as any).callback();
    }
  }
}

export function onDocumentTouchDown(event: TouchEvent): void {
  event.preventDefault();
  const { dispatch } = useStore();

  mouse.x = +(event.targetTouches[0].pageX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.targetTouches[0].pageY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    dispatch({ type: 'TOGGLE_MENU', payload: false });

    if (
      (intersects[0].object as any).callback &&
      typeof (intersects[0].object as any).callback === 'function'
    ) {
      (intersects[0].object as any).callback();
    }
  }
}

export function onWindowResize(): void {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  animate();
}

export function handleScreenshots(callback?: () => void) {
  controls.enabled = false;

  const { dispatch } = useStore();
  const strMime: string = 'image/png';
  const newImagesArr: string[] = [];

  camera.position.set(cameraPosChange.x, cameraPosChange.y, cameraPosChange.z);
  controls.update();

  const imgData1 = renderer.domElement.toDataURL(strMime);

  newImagesArr.push(imgData1);

  setTimeout(() => {
    camera.position.set(cameraPosStart.x, cameraPosStart.y, cameraPosStart.z);
    controls.update();

    const imgData2 = renderer.domElement.toDataURL(strMime);

    newImagesArr.push(imgData2);
    dispatch({ type: 'SET_ORDER_IMAGES', payload: newImagesArr });

    if (typeof callback === 'function') {
      callback();
    }
  }, 1);

  controls.enabled = true;
}

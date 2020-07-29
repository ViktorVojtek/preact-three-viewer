import styled from 'styled-components';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { scene } from '../utils/constants';
import { useStore } from '../utils/store';
import { animate } from '../utils';

const Center = styled.div`
  position: absolute;
  width: 100%;
  pointer-events: none;
  bottom: 15%;
`;

const MenuWrapper = styled.div`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  background: rgba(0, 0, 0, 0.75);
  position: relative;
  padding: 0.75rem;
  margin: 0 auto;
  width: fit-content;
`;

const MenuItem = styled.div`
  background: url(${({ img }) => img}) center center no-repeat;
  background-size: 150%;
  border: 2px solid #fff;
  display: block;
  width: 75px;
  height: 75px;
  margin-right: 0.5rem;
  pointer-events: all;

  &:last-child {
    margin-right: 0;
  }
`;

function ChangeMaterial(id, items, i, j) {
  const Loader = new TextureLoader();
  const object = scene.getObjectByName(id);

  Loader.load(
    items[i].textures[j].map,
    (texture) => {
      object.children[1].children[0].material.map = texture;
      object.children[1].children[0].material.needsUpdate = true;

      animate();
    },
    (xhr) => {
      const progress = +Math.round((xhr.loaded / xhr.total) * 100).toFixed(0);

      console.log(progress);
    }
  );
}

export default ({ show, items }) => {
  const { state } = useStore();

  const handleSetMatIdx = (i) => {
    const { currentModelName, models, objIdx } = state;

    ChangeMaterial(currentModelName, models, objIdx, i);
  };

  const menuItems =
    items && items.length > 0
      ? items.map((item, i) => (
          <MenuItem img={item} key={i} onClick={() => handleSetMatIdx(i)} />
        ))
      : null;

  return (
    <Center>
      <MenuWrapper show={show}>{menuItems}</MenuWrapper>
    </Center>
  );
};

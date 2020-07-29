import * as React from 'react';
import styled from 'styled-components';
import { Object3D } from 'three';
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

interface IMenuWrapperProps {
  show: boolean;
}
const MenuWrapper = styled.div`
  display: ${({ show }: IMenuWrapperProps) => (show ? 'flex' : 'none')};
  background: rgba(0, 0, 0, 0.75);
  position: relative;
  padding: 0.75rem;
  margin: 0 auto;
  width: fit-content;
`;

interface IMenuItemProps {
  img: string;
}
const MenuItem = styled.div`
  background: url(${({ img }: IMenuItemProps) => img}) center center no-repeat;
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

function ChangeMaterial(id: string, items: any[], i: number, j: number): void {
  const Loader: TextureLoader = new TextureLoader();
  const object: Object3D = scene.getObjectByName(id);

  Loader.load(items[i].textures[j].map, (texture) => {
    (object.children[1].children[0] as any).material.map = texture;
    (object.children[1].children[0] as any).material.needsUpdate = true;

    animate();
  });
}

export default function ({
  show,
  items,
}: {
  show: boolean;
  items: any[];
}): JSX.Element {
  const { state } = useStore();

  const handleSetMatIdx: (i: number) => void = (i) => {
    const { currentModelName, models, objIdx } = state;

    ChangeMaterial(currentModelName, models, objIdx, i);
  };

  const menuItems: JSX.Element[] =
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
}

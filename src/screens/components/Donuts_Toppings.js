import React from 'react';
import ToppingChocolate from '../../../assets/svg/T.Chocolate.svg';
import ToppingChRosadas from '../../../assets/svg/T.ChRosadas.svg';
import ToppingCoco from '../../../assets/svg/T.Coco.svg';
import ToppingColores from '../../../assets/svg/T.Colores.svg';
import ToppingMani from '../../../assets/svg/T.Mani.svg';

export const Chocolate = props => (
  <ToppingChocolate width={props.width} height={props.height} />
);
export const ChRosadas = props => (
  <ToppingChRosadas width={props.width} height={props.height} />
);
export const Coco = props => (
  <ToppingCoco width={props.width} height={props.height} />
);
export const Colores = props => (
  <ToppingColores width={props.width} height={props.height} />
);
export const Mani = props => (
  <ToppingMani width={props.width} height={props.height} />
);

export const TChocolate = {
<<<<<<< HEAD
  name: 'Chocolate',
=======
  name: 'Chispas de Chocolate',
>>>>>>> bffe8320f9f675a21b1184a0f74641563f1fc18b
  component: Chocolate,
};
export const TChRosadas = {
  name: 'Chispas Rosadas',
  component: ChRosadas,
};
export const TCoco = {
  name: 'Coco Rayado',
  component: Coco,
};
export const TColores = {
  name: 'Chispas de Colores',
  component: Colores,
};
export const TMani = {
  name: 'Mani',
  component: Mani,
};

import React from 'react';
import CubiertaChocolate from '../../../../assets/svg/C.Chocolate.svg';
import CubiertaArequipe from '../../../../assets/svg/C.Arequipe.svg';
import CubiertaChocolateB from '../../../../assets/svg/C.ChocBlanco.svg';
import CubiertaGlaseado from '../../../../assets/svg/C.Glaseado.svg';

export const Chocolate = props => (
  <CubiertaChocolate width={props.width} height={props.height} />
);
export const Arequipe = props => (
  <CubiertaArequipe width={props.width} height={props.height} />
);
export const ChocolateB = props => (
  <CubiertaChocolateB width={props.width} height={props.height} />
);
export const Glaseado = props => (
  <CubiertaGlaseado width={props.width} height={props.height} />
);

export const CChocolate = {
  name: 'Chocolate',
  component: Chocolate,
};
export const CArequipe = {
  name: 'Arequipe',
  component: Arequipe,
};
export const CChocolateB = {
  name: 'Choc.Blanco',
  component: ChocolateB,
};
export const CGlaseado = {
  name: 'Glaseado',
  component: Glaseado,
};

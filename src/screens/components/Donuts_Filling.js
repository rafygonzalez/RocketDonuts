import React from 'react';
import RellenoChocolate from '../../../assets/svg/R.Chocolate.svg';
import RellenoArequipe from '../../../assets/svg/R.Arequipe.svg';
import RellenoChocolateB from '../../../assets/svg/R.ChocBlanco.svg';
import RellenoCPastelera from '../../../assets/svg/R.CPastelera.svg';

export const Chocolate = props => (
  <RellenoChocolate width={props.width} height={props.height} />
);
export const Arequipe = props => (
  <RellenoArequipe width={props.width} height={props.height} />
);
export const ChocolateB = props => (
  <RellenoChocolateB width={props.width} height={props.height} />
);
export const CPastelera = props => (
  <RellenoCPastelera width={props.width} height={props.height} />
);

export const RChocolate = {
  name: 'Chocolate',
  component: Chocolate,
};
export const RArequipe = {
  name: 'Arequipe',
  component: Arequipe,
};
export const RChocolateB = {
  name: 'Choc.Blanco',
  component: ChocolateB,
};
export const RCPastelera = {
  name: 'Crema Pastelera',
  component: ChocolateB,
};

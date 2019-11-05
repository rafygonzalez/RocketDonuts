import React from 'react';
import Donut from '../../../assets/svg/Dona.svg';
import Bagel from '../../../assets/svg/Rosquilla.svg';
import EmptyDonut from '../../../assets/svg/EmptyDonut.svg';
import EmptyBagel from '../../../assets/svg/EmptyBagel.svg';
export const Dona = props => (
  <Donut width={props.width} height={props.height} />
);
export const Rosquilla = props => (
  <Bagel width={props.width} height={props.height} />
);
export const DonaSola = props => (
  <EmptyDonut width={props.width} height={props.height} />
);
export const RosquillaSola = props => (
  <EmptyBagel width={props.width} height={props.height} />
);

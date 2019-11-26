import React from 'react';
import {CChocolate, CArequipe, CChocolateB, CGlaseado} from './Donuts_Covers';
import {
  TChocolate,
  TChRosadas,
  TCoco,
  TColores,
  TMani,
} from './Donuts_Toppings';

// Dona
import Dona_CChoc_TMani from '../../../assets/svg/Donuts/Dona_CChoc_TMani.svg';
import Dona_CChoc_TChoc from '../../../assets/svg/Donuts/Dona_CChoc_TChoc.svg';
import Dona_CChoc_TRosa from '../../../assets/svg/Donuts/Dona_CChoc_TRosa.svg';
import Dona_CChoc_TColores from '../../../assets/svg/Donuts/Dona_CChoc_TColores.svg';
import Dona_CChoc_TCoco from '../../../assets/svg/Donuts/Dona_CChoc_TCoco.svg';

import Dona_CChocB_TMani from '../../../assets/svg/Donuts/Dona_CChocB_TMani.svg';
import Dona_CChocB_TRosa from '../../../assets/svg/Donuts/Dona_CChocB_TRosa.svg';
import Dona_CChocB_TColores from '../../../assets/svg/Donuts/Dona_CChocB_TColores.svg';
import Dona_CChocB_TCoco from '../../../assets/svg/Donuts/Dona_CChocB_TCoco.svg';
import Dona_CChocB_TChoc from '../../../assets/svg/Donuts/Dona_CChocB_TChoc.svg';

import Dona_CAreq_TChoc from '../../../assets/svg/Donuts/Dona_CAreq_TChoc.svg';
import Dona_CAreq_TCoco from '../../../assets/svg/Donuts/Dona_CAreq_TCoco.svg';
import Dona_CAreq_TColores from '../../../assets/svg/Donuts/Dona_CAreq_TColores.svg';
import Dona_CAreq_TMani from '../../../assets/svg/Donuts/Dona_CAreq_TMani.svg';
import Dona_CAreq_TRosa from '../../../assets/svg/Donuts/Dona_CAreq_TRosa.svg';

import Dona_Glaseado from '../../../assets/svg/Donuts/Dona_Glaseado.svg';

// Rosquilla
import Rosquilla_CChoc_TMani from '../../../assets/svg/Rosquillas/Rosquilla_CChoc_TMani.svg';
import Rosquilla_CChoc_TChoc from '../../../assets/svg/Rosquillas/Rosquilla_CChoc_TChoc.svg';
import Rosquilla_CChoc_TRosa from '../../../assets/svg/Rosquillas/Rosquilla_CChoc_TRosa.svg';
import Rosquilla_CChoc_TColores from '../../../assets/svg/Rosquillas/Rosquilla_CChoc_TColores.svg';
import Rosquilla_CChoc_TCoco from '../../../assets/svg/Rosquillas/Rosquilla_CChoc_TCoco.svg';

import Rosquilla_CChocB_TMani from '../../../assets/svg/Rosquillas/Rosquilla_CChocB_TMani.svg';
import Rosquilla_CChocB_TRosa from '../../../assets/svg/Rosquillas/Rosquilla_CChocB_TRosa.svg';
import Rosquilla_CChocB_TColores from '../../../assets/svg/Rosquillas/Rosquilla_CChocB_TColores.svg';
import Rosquilla_CChocB_TCoco from '../../../assets/svg/Rosquillas/Rosquilla_CChocB_TCoco.svg';
import Rosquilla_CChocB_TChoc from '../../../assets/svg/Rosquillas/Rosquilla_CChocB_TChoc.svg';

import Rosquilla_CAreq_TChoc from '../../../assets/svg/Rosquillas/Rosquilla_CAreq_TChoc.svg';
import Rosquilla_CAreq_TCoco from '../../../assets/svg/Rosquillas/Rosquilla_CAreq_TCoco.svg';
import Rosquilla_CAreq_TColores from '../../../assets/svg/Rosquillas/Rosquilla_CAreq_TColores.svg';
import Rosquilla_CAreq_TMani from '../../../assets/svg/Rosquillas/Rosquilla_CAreq_TMani.svg';
import Rosquilla_CAreq_TRosa from '../../../assets/svg/Rosquillas/Rosquilla_CAreq_TRosa.svg';

import Rosquilla_Glaseado from '../../../assets/svg/Rosquillas/Rosquilla_Glaseado.svg';
//

export function getDonut(cubierta, topping, type) {
  const Dona = `${cubierta} ${topping}`;
  switch (Dona) {
    // Donas de Chocolate y Toppings
    case `${CChocolate.name} ${TMani.name}`:
      return type == 'Dona' ? Dona_CChoc_TMani : Rosquilla_CChoc_TMani;
    case `${CChocolate.name} ${TChocolate.name}`:
      return type == 'Dona' ? Dona_CChoc_TChoc : Rosquilla_CChoc_TChoc;
    case `${CChocolate.name} ${TChRosadas.name}`:
      return type == 'Dona' ? Dona_CChoc_TRosa : Rosquilla_CChoc_TRosa;
    case `${CChocolate.name} ${TColores.name}`:
      return type == 'Dona' ? Dona_CChoc_TColores : Rosquilla_CChoc_TColores;
    case `${CChocolate.name} ${TCoco.name}`:
      return type == 'Dona' ? Dona_CChoc_TCoco : Rosquilla_CChoc_TCoco;
    // Donas de Chocolate Blanco y Toppings
    case `${CChocolateB.name} ${TMani.name}`:
      return type == 'Dona' ? Dona_CChocB_TMani : Rosquilla_CChocB_TMani;
    case `${CChocolateB.name} ${TChRosadas.name}`:
      return type == 'Dona' ? Dona_CChocB_TRosa : Rosquilla_CChocB_TRosa;
    case `${CChocolateB.name} ${TColores.name}`:
      return type == 'Dona' ? Dona_CChocB_TColores : Rosquilla_CChocB_TColores;
    case `${CChocolateB.name} ${TCoco.name}`:
      return type == 'Dona' ? Dona_CChocB_TCoco : Rosquilla_CChocB_TCoco;
    case `${CChocolateB.name} ${TChocolate.name}`:
      return type == 'Dona' ? Dona_CChocB_TChoc : Rosquilla_CChocB_TChoc;
    // Donas de Arequipe y Toppings
    case `${CArequipe.name} ${TChocolate.name}`:
      return type == 'Dona' ? Dona_CAreq_TChoc : Rosquilla_CAreq_TChoc;
    case `${CArequipe.name} ${TCoco.name}`:
      return type == 'Dona' ? Dona_CAreq_TCoco : Rosquilla_CAreq_TCoco;
    case `${CArequipe.name} ${TColores.name}`:
      return type == 'Dona' ? Dona_CAreq_TColores : Rosquilla_CAreq_TColores;
    case `${CArequipe.name} ${TMani.name}`:
      return type == 'Dona' ? Dona_CAreq_TMani : Rosquilla_CAreq_TMani;
    case `${CArequipe.name} ${TChRosadas.name}`:
      return type == 'Dona' ? Dona_CAreq_TRosa : Rosquilla_CAreq_TRosa;
    // Glaseada
    case `${CGlaseado.name} `:
      return type == 'Dona' ? Dona_Glaseado : Rosquilla_Glaseado;
    default:
      return 'No hay una combinación disponible';
  }
}

export function getDonutDescription(type, topping, cover, filling) {
  if (type == 'Dona') {
    if (topping.length > 1) {
      return `Rellena con ${filling}, Cubierta de ${cover} y Topping de ${topping}`;
    } else {
      return `Rellena con ${filling} y Cubierta de ${cover}`;
    }
  } else if (type == 'Rosquilla') {
    if (topping.length > 1) {
      return `Cubierta de ${cover} y Topping de ${topping}`;
    } else {
      return `Cubierta de ${cover}`;
    }
  }
}

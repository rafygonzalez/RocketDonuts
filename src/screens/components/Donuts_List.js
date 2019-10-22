import React from 'react';
import {CChocolate, CArequipe, CChocolateB, CGlaseado} from './Donuts_Covers';
import {
  TChocolate,
  TChRosadas,
  TCoco,
  TColores,
  TMani,
} from './Donuts_Toppings';

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

export default function DonutsSVG(cubierta, topping) {
  const Dona = `${cubierta} ${topping}`;
  switch (Dona) {
    // Donas de Chocolate y Toppings
    case `${CChocolate.name} ${TMani.name}`:
      return Dona_CChoc_TMani;
    case `${CChocolate.name} ${TChocolate.name}`:
      return Dona_CChoc_TChoc;
    case `${CChocolate.name} ${TChRosadas.name}`:
      return Dona_CChoc_TRosa;
    case `${CChocolate.name} ${TColores.name}`:
      return Dona_CChoc_TColores;
    case `${CChocolate.name} ${TCoco.name}`:
      return Dona_CChoc_TCoco;
    // Donas de Chocolate Blanco y Toppings
    case `${CChocolateB.name} ${TMani.name}`:
      return Dona_CChocB_TMani;
    case `${CChocolateB.name} ${TChRosadas.name}`:
      return Dona_CChocB_TRosa;
    case `${CChocolateB.name} ${TColores.name}`:
      return Dona_CChocB_TColores;
    case `${CChocolateB.name} ${TCoco.name}`:
      return Dona_CChocB_TCoco;
    case `${CChocolateB.name} ${TChocolate.name}`:
      return Dona_CChocB_TChoc;
    // Donas de Arequipe y Toppings
    case `${CArequipe.name} ${TChocolate.name}`:
      return Dona_CAreq_TChoc;
    case `${CArequipe.name} ${TCoco.name}`:
      return Dona_CAreq_TCoco;
    case `${CArequipe.name} ${TColores.name}`:
      return Dona_CAreq_TColores;
    case `${CArequipe.name} ${TMani.name}`:
      return Dona_CAreq_TMani;
    case `${CArequipe.name} ${TChRosadas.name}`:
      return Dona_CAreq_TRosa;
    // Glaseada
    case `${CGlaseado.name}`:
      return Dona_Glaseado;
  }
}

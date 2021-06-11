import { Hallazgo } from './hallazgo.model';
import { User } from '@unicauca/core';
import { Proceso } from './proceso.model';

export class plan {
  idPlanMejoramiento: string;
  objLiderAuditor: User;
  objLiderProceso: User;
  proceso: Proceso;
  listaHallazgos: Hallazgo[];

  nombre: string;
  responsable: string;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
  codeURL: string;
  pathSoporte: string;
  prorrogado: boolean;
  mensaje: any;
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedComponentsTablaModule } from '@unicauca/shared/components/tabla';
import { SharedComponentsCirculoModule } from '@unicauca/shared/components/circulo';
import { ModulesEstadisticasDataAccessModule } from '@unicauca/modules/estadisticas/data-access';
import {
  PlanService,
  ProcesoService,
} from '@unicauca/modules/plan-mejoramiento/data-access';
import { HallazgoService } from '@unicauca/modules/hallazgos/data-access';
import { ActividadesService } from '@unicauca/modules/actividades/data-access';
import { AccionesService } from '@unicauca/modules/acciones/data-access';

import { ProcesosPmiComponent } from './procesos-pmi/procesos-pmi.component';
import { PlanMejoramientoComponent } from './plan-mejoramiento/plan-mejoramiento.component';
import { ControlPmComponent } from './control-pm/control-pm.component';
import { ProcesoIndividualComponent } from './proceso-individual/proceso-individual.component';

const routes: Routes = [
  {
    path: 'procesos',
    component: ProcesosPmiComponent,
  },
  {
    path: 'proceso/:idProceso',
    component: ProcesoIndividualComponent,
  },
  {
    path: 'plan-mejora/:idPlan',
    component: PlanMejoramientoComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,

    SharedComponentsTablaModule,
    SharedComponentsCirculoModule,

    ModulesEstadisticasDataAccessModule,

    RouterModule.forChild(routes)
  ],
  declarations: [
    ProcesosPmiComponent,
    PlanMejoramientoComponent,
    ControlPmComponent,
    ProcesoIndividualComponent,
  ],
  exports: [
    ProcesosPmiComponent,
    ProcesoIndividualComponent,
    PlanMejoramientoComponent,
    ControlPmComponent,
  ],
  providers: [
    ProcesoService,
    HallazgoService,
    PlanService,
    ActividadesService,
    AccionesService
  ]
})
export class ModulesEstadisticasFeatureEstadisticasModule {}

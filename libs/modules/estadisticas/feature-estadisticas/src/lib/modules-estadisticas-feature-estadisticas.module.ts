import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { MatButtonModule } from '@angular/material/button';

import { ModulesEstadisticasDataAccessModule } from '@unicauca/modules/estadisticas/data-access';
import { SharedComponentsTablaModule } from '@unicauca/shared/components/tabla';
import { SharedComponentsGraficosModule } from '@unicauca/shared/components/graficos';


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
import { SharedPipesModule } from '@unicauca/shared/pipes';

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

    MatButtonModule,

    SharedComponentsTablaModule,
    SharedComponentsGraficosModule,
    SharedPipesModule,

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

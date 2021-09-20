import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcesosPmiComponent } from './procesos-pmi/procesos-pmi.component';
import { PlanMejoramientoComponent } from './plan-mejoramiento/plan-mejoramiento.component';
import { ControlPmComponent } from './control-pm/control-pm.component';
import { ProcesoIndividualComponent } from './proceso-individual/proceso-individual.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ProcesosPmiComponent,
    PlanMejoramientoComponent,
    ControlPmComponent,
    ProcesoIndividualComponent,
  ],
})
export class ModulesEstadisticasFeatureEstadisticasModule {}

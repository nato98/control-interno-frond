import { SharedComponentsContenedorDashboardModule } from './../../../../../shared/components/contenedor-dashboard/src/lib/shared-components-contenedor-dashboard.module';
import { ModulesSeguimientoPlanMejoraDataAccessModule } from './../../../data-access/src/lib/modules-seguimiento-plan-mejora-data-access.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeguimientoAuditorComponent } from './seguimiento-auditor/seguimiento-auditor.component';
import { SharedComponentsTablaModule } from '@unicauca/shared/components/tabla';
import { SharedPipesModule } from '@unicauca/shared/pipes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
       {path: '', component: SeguimientoAuditorComponent}
    ]),

    ModulesSeguimientoPlanMejoraDataAccessModule.forChild(),

    SharedPipesModule,
    SharedComponentsTablaModule,
    SharedComponentsContenedorDashboardModule,
  ],
  declarations: [SeguimientoAuditorComponent],
})
export class ModulesSeguimientoPlanMejoraFeatureSeguimientoModule {}

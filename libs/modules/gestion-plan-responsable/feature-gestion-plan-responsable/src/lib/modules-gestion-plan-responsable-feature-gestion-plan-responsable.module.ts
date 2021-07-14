import { ModulesSeguimientoPlanMejoraDataAccessModule } from './../../../../seguimiento-plan-mejora/data-access/src/lib/modules-seguimiento-plan-mejora-data-access.module';
import { ContainerComponent } from './../../../../../shared/components/tabs/src/lib/container/container.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ComponenteBaseComponent } from './componente-base/componente-base.component';
import { TableroResponsableComponent } from './tablero-responsable/tablero-responsable.component';
import { ActividadesPorAccionComponent } from './actividades-por-accion/actividades-por-accion.component';

import { ModulesActividadesDataAccessModule } from './../../../../actividades/data-access/src/lib/modules-actividades-data-access.module';
import { ModulesGestionPlanResponsableDataAccessModule } from './../../../data-access/src/lib/modules-gestion-plan-responsable-data-access.module';

import { SharedPipesModule } from '@unicauca/shared/pipes';
import { SharedComponentsTablaModule } from '@unicauca/shared/components/tabla';
import { SharedComponentsDialogoSimpleModule } from '@unicauca/shared/components/dialogo-simple';
import { SharedComponentsContenedorDashboardModule } from '@unicauca/shared/components/contenedor-dashboard';

import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SubirEvidenciaComponent } from './subir-evidencia/subir-evidencia.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  {
    path: '',
    component: ComponenteBaseComponent,
    children: [
      {
        path: '',
        component: ContainerComponent,
        children: [
          {
            path: '',
            component: TableroResponsableComponent,
          },
          {
            path: 'actividades/:idAccion/:nombrePlan/:fechaFin/:tipoAccion',
            component: ActividadesPorAccionComponent,
          },
        ],
      },
    ],
  },
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    LayoutModule,
    FlexLayoutModule,

    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSidenavModule,

    SharedPipesModule,
    SharedComponentsTablaModule,
    SharedComponentsContenedorDashboardModule,
    SharedComponentsDialogoSimpleModule,

    ModulesActividadesDataAccessModule.forChild(),
    ModulesSeguimientoPlanMejoraDataAccessModule.forChild(),
    ModulesGestionPlanResponsableDataAccessModule.forChild(),

    RouterModule.forChild(routes),
  ],
  declarations: [TableroResponsableComponent, ComponenteBaseComponent, ActividadesPorAccionComponent, SubirEvidenciaComponent],
})
export class ModulesGestionPlanResponsableFeatureGestionPlanResponsableModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { MatCardModule } from '@angular/material/card';
import { PorcentajeGraficoComponent } from './porcentaje-grafico/porcentaje-grafico.component';
import { PastelGraficoComponent } from './pastel-grafico/pastel-grafico.component';
import { CirculoGraficoComponent } from './circulo-grafico/circulo-grafico.component';

@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule,
    MatCardModule
  ],
  declarations: [PorcentajeGraficoComponent, PastelGraficoComponent, CirculoGraficoComponent],
  exports: [PorcentajeGraficoComponent, PastelGraficoComponent, CirculoGraficoComponent]
})
export class SharedComponentsGraficosModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { PieChartComponent } from './pie-chart/pie-chart.component';
import { MatCardModule } from '@angular/material/card';
import { PieGridComponent } from './pie-grid/pie-grid.component';

@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule,
    MatCardModule
  ],
  declarations: [PieChartComponent, PieGridComponent],
  exports: [PieChartComponent, PieGridComponent]
})
export class SharedComponentsGraficosModule {}

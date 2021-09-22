import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CirculoComponent } from './circulo/circulo.component';

import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [CommonModule, MatCardModule],
  declarations: [CirculoComponent],
  exports: [CirculoComponent],
})
export class SharedComponentsCirculoModule {}

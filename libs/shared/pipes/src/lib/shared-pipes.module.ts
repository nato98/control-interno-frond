import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextSlicePipe } from './text-slice.pipe';
import { CapitalizePipe } from './capitalize.pipe';
import { FechaLocalPipe } from './fecha-local.pipe';
import { WithLoadingPipe } from './with-loading.pipe';
import { FiltroFechasPipe } from './filtro-fechas.pipe';
import { LiderProcesoPipe } from './lider-proceso.pipe';

@NgModule({
  declarations: [
    TextSlicePipe,
    CapitalizePipe,
    FechaLocalPipe,
    WithLoadingPipe,
    FiltroFechasPipe,
    LiderProcesoPipe,
  ],
  imports: [CommonModule],
  exports: [
    TextSlicePipe,
    CapitalizePipe,
    FechaLocalPipe,
    WithLoadingPipe,
    FiltroFechasPipe,
    LiderProcesoPipe,
  ],
})
export class SharedPipesModule {}

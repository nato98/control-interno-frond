import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaPlanAuditorService } from './service/lista-plan-auditor.service';

@NgModule({
  imports: [CommonModule],
})
export class ModulesSeguimientoPlanMejoraDataAccessModule {
  static forChild(): ModuleWithProviders<ModulesSeguimientoPlanMejoraDataAccessModule> {
    return {
      ngModule: ModulesSeguimientoPlanMejoraDataAccessModule,
      providers: [ListaPlanAuditorService],
    };
  }
}

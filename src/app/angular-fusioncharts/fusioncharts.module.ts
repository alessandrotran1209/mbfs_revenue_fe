import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FusionChartsDirective } from './fusioncharts.directive';
import {
  FusionChartsService,
  FusionChartsStatic,
} from './fusioncharts.service';

@NgModule({
  imports: [CommonModule],
  declarations: [FusionChartsDirective],
  exports: [FusionChartsDirective],
})
export class FusionChartsModule {
  static forRoot(
    core: any,
    ...modules: any[]
  ): ModuleWithProviders<FusionChartsModule> {
    return {
      ngModule: FusionChartsModule,
      providers: [
        FusionChartsService,
        {
          provide: FusionChartsStatic,
          useValue: {
            core,
            modules,
          },
        },
      ],
    };
  }
}

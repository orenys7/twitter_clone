import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedRoutingModule } from './shared-routing.module';
import { AngularMaterialModule} from './layout/material/material.module';
import { MenuComponent } from './layout/menu/menu.component';
import { FullpageDirective } from './directives/fullpage.directive';

@NgModule({
    declarations: [
        MenuComponent,
        FullpageDirective
    ],
    imports: [
      CommonModule,
      AngularMaterialModule,
      SharedRoutingModule
    ],
    exports: [
        MenuComponent,
    ]
  })
  export class SharedModule { }
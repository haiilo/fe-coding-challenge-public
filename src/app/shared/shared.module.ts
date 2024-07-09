import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { TruncateDescriptionDirective } from './directives/truncate-description.directive';




@NgModule({
  declarations: [
    TruncateDescriptionDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TruncateDescriptionDirective
  ]
})
export class SharedModule { }

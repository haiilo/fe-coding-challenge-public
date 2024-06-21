import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ToastComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ToastComponent
  ]
})
export class SharedModule { }

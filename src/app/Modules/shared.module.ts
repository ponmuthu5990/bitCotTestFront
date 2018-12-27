import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@NgModule({
  imports: [ MaterialModule, ConfirmDialogModule, FormsModule, ReactiveFormsModule, 
    ],
  declarations: [SafePipe],
  exports: [
    MaterialModule, ConfirmDialogModule, FormsModule, ReactiveFormsModule,
    SafePipe
  ],
  providers:[ConfirmationService]
})
export class SharedModule { }

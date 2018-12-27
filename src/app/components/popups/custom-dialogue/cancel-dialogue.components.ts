import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
    template: `
      <div class="dialog">
      <h1 mat-dialog-title>Info</h1>
      <mat-dialog-content>
      Are you sure you want to <br> Cancel changes?
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button id="ok" (click)=submit()>Ok</button>
        <button mat-button id="cancel" (click)=cancel()>Cancel</button>
      </mat-dialog-actions>
      </div>
    `
  })
  export class CancelDialogComponent {

    isClose:boolean;
    isOk:boolean;
    constructor(private dialogRef: MatDialogRef<CancelDialogComponent>){
        this.isClose=false;
        this.isOk=false;
    }

    submit(){
        this.dialogRef.close(true);
    }
    cancel(){
        this.dialogRef.close(false);
    }

  }
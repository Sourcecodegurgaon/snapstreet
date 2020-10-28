import { Component,  OnInit, Inject } from '@angular/core';
import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'app-alert-login',
  templateUrl: './alert-login.component.html',
  styleUrls: ['./alert-login.component.css']
})
export class AlertLoginComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<AlertLoginComponent>) {
      this.dialogRef.updateSize('300vw','300vw')
     }
    
  ngOnInit() {
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}

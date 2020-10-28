import { Component,  OnInit, Inject } from '@angular/core';
import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material'
import {StrapiAuthService} from "../../strapi-auth.service"

@Component({
  selector: 'app-alert-user-type',
  templateUrl: './alert-user-type.component.html',
  styleUrls: ['./alert-user-type.component.css']
})
export class AlertUserTypeComponent implements OnInit {

  constructor(
    public StrapiAuthService:StrapiAuthService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<AlertUserTypeComponent>) {
      this.dialogRef.updateSize('300vw','300vw')
     }
    
  ngOnInit() {
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  logout()
  {
    this.StrapiAuthService.logout()
  }
}

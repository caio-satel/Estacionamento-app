import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ocupar-vaga',
  templateUrl: './ocupar-vaga.component.html',
  styleUrls: ['./ocupar-vaga.component.css']
})
export class OcuparVagaComponent {
  placaCarro!: string;

  constructor(
    public dialogRef: MatDialogRef<OcuparVagaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmitClick(): void {
    this.dialogRef.close(this.placaCarro);
  }
}

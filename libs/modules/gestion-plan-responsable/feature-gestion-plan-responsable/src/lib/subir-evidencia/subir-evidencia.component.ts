import { Actividad } from '@unicauca/modules/plan-mejoramiento/data-access';
import { Evaluacion } from './../../../../../seguimiento-plan-mejora/data-access/src/lib/model/evaluacion.model';
import { Evidencia } from './../../../../data-access/src/lib/model/evidencia.model';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GestionPlanResponsableService } from 'libs/modules/gestion-plan-responsable/data-access/src/lib/services/gestion-plan-responsable.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { EvaluacionService } from 'libs/modules/seguimiento-plan-mejora/data-access/src/lib/service/evaluacion.service';

@Component({
  selector: 'unicauca-subir-evidencia',
  templateUrl: './subir-evidencia.component.html',
  styleUrls: ['./subir-evidencia.component.scss']
})
export class SubirEvidenciaComponent implements OnInit {

  public nombreEvidencia = '';
  private unsubscribe$ = new Subject();

  constructor(
    public dialogRef: MatDialogRef<SubirEvidenciaComponent>,
    @Inject(MAT_DIALOG_DATA) public actividadSeleccionada: any,
    private gestionPlanResponsableService: GestionPlanResponsableService,
    private evaluacionService: EvaluacionService,
  ) { }

  ngOnInit(): void {
  }

  public onCancelar(): void{
    Swal.fire({
      title: `Advertencia`,
      text: '¿Desear cancelar la acción?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        return this.dialogRef.close();
      }
    });
  }

  public onGuardar(): void{
    const evidencia: Evidencia = {
      id: null,
      evidencia: this.nombreEvidencia,
      objActividad: this.actividadSeleccionada
    }
    this.gestionPlanResponsableService.guardarEvidencia(evidencia)
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe(res => {

      const evaluacion: Evaluacion = {
        id: null,
        estado: null,
        fecha_evaluacion: null,
        observacion: null,
        objEvidencia: res,
        objPersona: this.actividadSeleccionada.objAccion.objCausa.objHallazgo.objPlan.objLiderAuditor
      }
      this.evaluacionService.guardarEvaluacion(evaluacion)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => this.dialogRef.close())
    })
  }

}

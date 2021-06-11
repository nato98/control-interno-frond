import { Columna, EstadoButtons, TipoColumna } from '@unicauca/shared/components/tabla';
import { AuthService } from './../../../../../../auth/src/lib/data-access/auth/auth.service';
import { ListaresponsableModel } from './../../../../data-access/src/lib/model/lista-responsable.model';
import { Component, Input, OnInit } from '@angular/core';
import { PlanAuditorDTO } from 'libs/modules/seguimiento-plan-mejora/data-access/src/lib/model/plan-auditor.dto';
import { ListaPlanAuditorService } from 'libs/modules/seguimiento-plan-mejora/data-access/src/lib/service/lista-plan-auditor.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'unicauca-seguimiento-auditor',
  templateUrl: './seguimiento-auditor.component.html',
  styleUrls: ['./seguimiento-auditor.component.scss']
})
export class SeguimientoAuditorComponent implements OnInit {

  planes$: Observable<ListaresponsableModel[]>

  titulo = '';
  activarFiltroItems = true;

  unsubscribe$ = new Subject();

  estadoButtons: EstadoButtons = {
    crear: false,
      editar: false,
      eliminar: false,
      upload: false,
      visualizar: true,
      seleccionar: false,
  };

  /**Array de titulos de columnas */
  columnas: Columna[] = [
    { nombreCelda: 'nombrePlan', nombreCeldaHeader: 'Nombre' },
    { nombreCelda: 'estado', nombreCeldaHeader: 'Estado' },
    //{ nombreCelda: 'tipoAccion', nombreCeldaHeader: 'Tipo acción' },
    { nombreCelda: 'fechaUltimoSeguimiento', nombreCeldaHeader: 'Fecha último seguimiento' },
    { nombreCelda: 'nombreResponsable', nombreCeldaHeader: 'Responsable'},
    { nombreCelda: 'efectividad', nombreCeldaHeader: 'Efectividad'},
    { nombreCelda: 'avance', nombreCeldaHeader: '% de avance'},
    { nombreCelda: 'evidencias', nombreCeldaHeader: 'Evidencias', tipo: TipoColumna.ACCIONES,},
  ];

  streamDatos$ = new BehaviorSubject<any[]>([]);

  @Input()
  searchText;

  currentPage = 1;
  itemsPerPage = 5;
  pageSize: number;
  data: PlanAuditorDTO[] = [];

  correo: string;
  rol: string;

  constructor(private servicio: ListaPlanAuditorService, private authService: AuthService,) {
  }
  ngOnInit(): void {
    this.correo = this.authService.getUsuario().objPerson.email;
    this.rol = this.authService.getUsuario().objRole[0];
    new Promise((res, rej) => {
      const idAuditor = this.authService.getUsuario().objPerson.id;
      res(idAuditor);
    }).then((idAuditor: string) => {
      this.servicio.findByAuditorEmail(idAuditor)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(r => {
        this.data = r;
        this.streamDatos$.next(this.data)
      });
    })
  }
}

import { AuthService } from './../../../../../../auth/src/lib/data-access/auth/auth.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Hallazgo } from '@unicauca/modules/plan-mejoramiento/data-access';
import { map, takeUntil, tap } from 'rxjs/operators';
import { plan } from './../../../../../plan-mejoramiento/data-access/src/lib/model/plan.model';

import { Component, OnChanges, OnInit } from '@angular/core';
import {
  Columna,
  EstadoButtons,
  TipoColumna,
} from '@unicauca/shared/components/tabla';
import { HallazgoService } from 'libs/modules/hallazgos/data-access/src/lib/service/hallazgo.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EstadosComunService } from '@unicauca/core';

@Component({
  selector: 'unicauca-historial-hallazgos',
  templateUrl: './historial-hallazgos.component.html',
  styleUrls: ['./historial-hallazgos.component.scss'],
})
export class HistorialHallazgosComponent implements OnInit, OnChanges {
  plan: plan;

  nombrePlan = '';
  titulo = '';
  activarFiltroItems = true;
  hallazgos: Hallazgo[] = [];

  unsubscribe$ = new Subject();

  esAuditor = false;
  hintAgregarOVerAuditor = '';

  estadoButtons: EstadoButtons = {};

  columnas: Columna[] = [
    { nombreCelda: 'posicion', nombreCeldaHeader: 'Posición' },
    { nombreCelda: 'hallazgo', nombreCeldaHeader: 'Descripción' },
    {
      nombreCelda: 'acciones',
      nombreCeldaHeader: 'Acciones',
      tipo: TipoColumna.ACCIONES,
    },
  ];

  streamDatos$ = new BehaviorSubject<any[]>([]);
  unSubscribe$ = new Subject();

  constructor(
    private router: Router,
    private authService: AuthService,
    private hallazgoService: HallazgoService,
    private estadosComunService: EstadosComunService
  ) {}

  ngOnInit(): void {
    this.esAuditor = (this.authService.getUsuario().objRole[0] === 'ROLE_auditor');
    this.hintAgregarOVerAuditor = (this.esAuditor ? 'Ver' : 'Agregar');
    this.llenarBotones();
    //this.listarHallazgos();
    this.estadosComunService.customPlan
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((msg) => (this.plan = msg));
    this.estadosComunService.customSelectedIndex
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
    this.listarHallazgos();
  }
  llenarBotones(){
    this.estadoButtons = {
      crear: true,
      editar: !this.esAuditor,
      eliminar: !this.esAuditor,
      upload: false,
      visualizar: true,
      seleccionar: false,
    };
  }

  ngOnChanges() {
    this.listarHallazgos();
  }

  private listarHallazgos() {
    if (this.plan !== undefined) {
      this.plan !== null ? (this.nombrePlan = this.plan.nombre) : null;
      this.plan !== null
        ? this.hallazgoService
            .getHallazgos(this.plan.codeURL)
            .pipe(
              takeUntil(this.unSubscribe$),
              tap((res) => (this.hallazgos = res)),
              map((listaHallazgos: any[]) =>
                listaHallazgos.map((hallazgo, index) => ({
                  id: hallazgo.id_hallazgo,
                  posicion: index + 1,
                  hallazgo: `${hallazgo?.hallazgo}`,
                  objPlan: hallazgo?.objPlan,
                }))
              )
            )
            .subscribe(
              (datosHallazgos) => {
                this.streamDatos$.next(datosHallazgos);
                this.estadosComunService.changeSelectedIndex(1);
              },
              () => {
                this.streamDatos$.next([]);
              }
            )
        : null;
    }
  }

  public agregar(): void {
    if (this.plan !== undefined) {
      this.router.navigate([
        '/home/planes-mejora/historial/hallazgos/gestionHallazgos',
        this.plan.codeURL,
      ]);
    }
    // this.router.navigate([this.router.url + '/gestionHallazgos']);
    this.estadosComunService.changeSelectedIndex(1);
  }

  public onDeletePlan(hallazgo): void {
    Swal.fire({
      title: `¿Deseas eliminar el hallazgo ${hallazgo.posicion}?`,
      text: 'Los datos serán eliminados permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.hallazgoService
          .eliminarHallazgo(hallazgo.id)
          .pipe(takeUntil(this.unSubscribe$))
          .subscribe(
            (respuestaBack) => {
              this.listarHallazgos();
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: `${respuestaBack.mensaje}`,
                showConfirmButton: true
              });
            },
            (error) => {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: `${error.error.mensaje}`,
                showConfirmButton: true,
                // timer: 1800,
              });
            }
          );
      }
    });
  }

  public onEditarPlan(hallazgo): void {
    if (this.plan !== undefined) {
      this.router.navigate([
        this.router.url + '/gestionHallazgos',
        this.plan.codeURL,
        hallazgo.id,
      ]);
      localStorage.setItem('visualizar', 'false');
      this.estadosComunService.changeSelectedIndex(1);
    }
  }

  public onVisualizar(hallazgo): void {
    if (this.plan !== undefined) {
      this.router.navigate([
        this.router.url + '/gestionHallazgos',
        this.plan.codeURL,
        hallazgo.id,
      ]);
      localStorage.setItem('visualizar', 'true');
      this.estadosComunService.changeSelectedIndex(1);
    }
  }

  public onCrearCausas(hallazgoParametro): void {
    const hallazgoAAgregarCausa: Hallazgo[] = this.hallazgos.filter(
      (hallazgo) => hallazgo.id_hallazgo === hallazgoParametro.id
    );
    this.estadosComunService.changeHallazgo(hallazgoAAgregarCausa[0]);
    this.router.navigate(['/home/planes-mejora/historial/causas']);
    this.estadosComunService.changeSelectedIndex(2);
  }
}

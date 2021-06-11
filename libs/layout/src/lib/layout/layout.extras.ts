import { Observable, of } from 'rxjs';

export enum TipoUsuario {
  ADMINISTRADOR,
  AUDITOR,
  LIDER_PROCESO,
  RESPONSABLE,
}

export interface Menu {
  tipoUsuario: TipoUsuario;
  itemsMenu: ItemMenu[];
}

export interface ItemMenu {
  ruta: string;
  icon: string;
  nombre: string;
}

export function crearItemsMenuPorTipoUsuario(
  tipoUsuario: TipoUsuario = TipoUsuario.ADMINISTRADOR
): Observable<ItemMenu[]> {
  const menu: Menu[] = [
    {
      tipoUsuario: TipoUsuario.ADMINISTRADOR,
      itemsMenu: [
        { ruta: 'inicio', icon: 'home', nombre: 'Inicio' },
        {
          ruta: 'admin/gestion-usuarios/historial',
          icon: 'supervisor_account',
          nombre: 'Usuarios',
        },
        {
          ruta: 'admin/historial-ingresos',
          icon: 'content_paste',
          nombre: 'Historial de ingresos',
        },
        {
          ruta: 'planes-mejora/historial/planes',
          icon: 'library_books',
          nombre: 'Plan de mejoramiento',
        },
        // { ruta: '/admin/home', icon: 'bar_chart', nombre: 'Estadísticas' },
      ],
    },
    {
      tipoUsuario: TipoUsuario.AUDITOR,
      itemsMenu: [
        { ruta: 'inicio', icon: 'home', nombre: 'Inicio' },
        {
          ruta: 'planes-mejora/historial/planes',
          icon: 'library_books',
          nombre: 'Plan de mejoramiento',
        },
        {
          ruta: 'seguimiento-plan-mejora/seguimiento',
          icon: 'file_download_done',
          nombre: 'Seguimiento',
        },
      ],
    },
    {
      tipoUsuario: TipoUsuario.LIDER_PROCESO,
      itemsMenu: [
        { ruta: 'inicio', icon: 'home', nombre: 'Inicio' },
        {
          ruta: 'admin/gestion-responsables/historial',
          icon: 'supervisor_account',
          nombre: 'Gestionar responsables',
        },
        {
          ruta: 'planes-mejora/historial/planes',
          icon: 'library_books',
          nombre: 'Plan de mejoramiento',
        },
      ],
    },
    {
      tipoUsuario: TipoUsuario.RESPONSABLE,
      itemsMenu: [
        { ruta: 'inicio', icon: 'home', nombre: 'Inicio' },
        {
          ruta: 'planes-mejora/historial/planes',
          icon: 'library_books',
          nombre: 'Plan de mejoramiento',
        },
      ],
    },
  ];
  return of(menu.find((menu) => menu.tipoUsuario === tipoUsuario).itemsMenu);
}

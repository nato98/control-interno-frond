export interface PlanAuditorDTO {
  idPlan: string;
  nombreResponsable: string;
  nombreAuditor: string;
  nombrePlan: string;
  estado: string;
  fechaUltimoSeguimiento: Date;
  fechaLimite: Date;
  efectividad: string;
  avance: number;
}

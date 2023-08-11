export interface CandidateDTO {
  id?: number;
  nombres?: string;
  apellidos?: string;
  correo?: string;
  gender?: 'MALE' | 'FEMALE';
  numeroResolucion?: number;
  telefono?: string;
  roles?: string[],
  partido?: string,
}

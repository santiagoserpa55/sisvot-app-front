export interface CandidateDTO {
  id?: number;
  nombres?: string;
  apellidos?: string;
  correo?: string;
  roles?: string[];
  usuario?: CandidateDTO;
  eslogan?: string;
  partido?: string,
}

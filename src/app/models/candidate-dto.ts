export interface CandidateDTO {
  _id?: number;
  nombres?: string;
  apellidos?: string;
  correo?: string;
  roles?: string[];
  usuario?: CandidateDTO;
  eslogan?: string;
  partido?: string,
}

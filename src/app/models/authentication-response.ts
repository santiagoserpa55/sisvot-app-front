import { CandidateDTO } from './candidate-dto';

export interface AuthenticationResponse {
  token?: string;
  candidateDTO: CandidateDTO;
}

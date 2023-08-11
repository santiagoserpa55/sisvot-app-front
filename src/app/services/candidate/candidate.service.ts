import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CandidateDTO } from 'src/app/models/candidate-dto';
import { CandidateRegistrationRequest } from 'src/app/models/candidate-registration-request';
import { CandidateUpdateRequest } from 'src/app/models/candidate-update-request';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private readonly candidateUrl = `${environment.api.baseUrl}/${environment.api.candidateUrl}`;

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<CandidateDTO[]> {
    return this.http.get<CandidateDTO[]>(this.candidateUrl);
  }

  registerCandidate(candidate: CandidateRegistrationRequest): Observable<void> {
    return this.http.post<void>(this.candidateUrl, candidate);
  }

  deleteCandidate(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.candidateUrl}/${id}`);
  }

  updateCandidate(id: number | undefined, candidate: CandidateUpdateRequest): Observable<void> {
    return this.http.put<void>(`${this.candidateUrl}/${id}`, candidate);
  }
}

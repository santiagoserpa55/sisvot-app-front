import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CandidateDTO } from 'src/app/models/candidate-dto';
import { CandidateRegistrationRequest } from 'src/app/models/candidate-registration-request';
import { CandidateService } from 'src/app/services/candidate/candidate.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  display = false;
  operation: 'create' | 'update' = 'create';
  candidates: Array<CandidateDTO> = [];
  candidate: CandidateRegistrationRequest = {
    // contrasena: undefined
  };
  errorMsg: string = '';

  constructor(

    private candidateService: CandidateService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.findAllCandidates();
  }

  private findAllCandidates() {
    this.candidateService.findAll().subscribe({
      next: (data) => {
        this.candidates = data;
        console.log(data);
      },
    });
  }

  save(candidate: CandidateRegistrationRequest) {
    if (candidate) {
      if (this.operation === 'create') {
        this.candidateService.registerCandidate(candidate).subscribe({
          next: () => {
            this.findAllCandidates();
            this.display = false;
            this.candidate = {};
            this.messageService.add({
              severity: 'success',
              summary: 'Candidato registrado',
              detail: `Candidato ${candidate.nombres} fue registrado exitosamente`,
            });
          },
        });
      } else if (this.operation === 'update') {
        this.candidateService
          .updateCandidate(candidate.id, candidate)
          .subscribe({
            next: () => {
              this.findAllCandidates();
              this.display = false;
              this.candidate = {};
              this.messageService.add({
                severity: 'success',
                summary: 'Candidato actualizado',
                detail: `Candidato ${candidate.nombres} fue actualizado exitosamente`,
              });
            },
          });
      }
    }
  }



  createCandidate() {
    this.display = true;
    this.candidate = {};
    this.operation = 'create';
  }

  cancel() {
    this.display = false;
    this.candidate = {};
    this.operation = 'create';
  }
}

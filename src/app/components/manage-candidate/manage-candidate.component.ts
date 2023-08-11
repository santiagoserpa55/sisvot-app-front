import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CandidateRegistrationRequest } from 'src/app/models/candidate-registration-request';

@Component({
  selector: 'app-manage-candidate',
  templateUrl: './manage-candidate.component.html',
  styleUrls: ['./manage-candidate.component.scss']
})
export class ManageCandidateComponent {

  @Input()
  candidate: CandidateRegistrationRequest = {
    contrasena: undefined
  };
  @Input()
  operation: 'create' | 'update' = 'create';
  @Output()
  submit: EventEmitter<CandidateRegistrationRequest> = new EventEmitter<CandidateRegistrationRequest>();
  @Output()
  cancel: EventEmitter<void> = new EventEmitter<void>();

  get isCandidateValid(): boolean {
    return this.hasLength(this.candidate.nombres) &&
      this.hasLength(this.candidate.correo) &&
      this.candidate.numeroResolucion !== undefined && this.candidate.numeroResolucion > 0 &&
      (
        this.operation === 'update' ||
        this.hasLength(this.candidate.nombres) &&
        this.hasLength(this.candidate.apellidos)
      )
      ;
  }

  private hasLength(input: string | undefined): boolean {
    return input !== null && input !== undefined && input.length > 0
  }

  onSubmit() {
    this.submit.emit(this.candidate);
  }

  onCancel() {
    this.cancel.emit();
  }
}

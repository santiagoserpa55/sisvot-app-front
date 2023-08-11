import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CandidateDTO } from 'src/app/models/candidate-dto';

@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss']
})
export class CandidateCardComponent {

  @Input()
 // candidate: any = {};
  candidate: CandidateDTO = {};

  @Input()
  candidateIndex = 0;

  @Output()
  delete: EventEmitter<CandidateDTO> = new EventEmitter<CandidateDTO>();
  @Output()
  update: EventEmitter<CandidateDTO> = new EventEmitter<CandidateDTO>();

/*   get candidateImage(): string {
    const gender = this.candidate.gender === 'MALE' ? 'men' : 'women';
    return `https://randomuser.me/api/portraits/${gender}/${this.candidateIndex}.jpg`;
  } */

  onDelete() {
    this.delete.emit(this.candidate);
  }
  onUpdate() {
    this.update.emit(this.candidate);
  }
}

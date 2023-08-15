import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CandidateDTO } from 'src/app/models/candidate-dto';

@Component({
  selector: 'app-votar',
  templateUrl: './votar.component.html',
  styleUrls: ['./votar.component.scss']
})
export class VotarComponent {


  @Input()
 // candidate: any = {};
  candidate: CandidateDTO = {};


  @Input()
  candidateIndex = 0;

  @Output()
  votar: EventEmitter<CandidateDTO> = new EventEmitter<CandidateDTO>();




  onVotar() {
    this.votar.emit(this.candidate);
  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CandidateDTO } from 'src/app/models/candidate-dto'
import { StorageService } from 'src/app/services/storage.service'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss'],
})
export class CandidateCardComponent {
  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {}
  @Input()
  candidate: CandidateDTO = {}

  @Input()
  candidateIndex = 0

/*   @Output()
  votar: EventEmitter<CandidateDTO> = new EventEmitter<CandidateDTO>() */

/*   onVotar() {
    const users = this.storageService.getUser()
    const userId = users.id
    const candidateId = this.candidate.id
    
    this.authService.votar(userId, candidateId).subscribe(
      (response) => {
        console.log('Voting response:', response)
      },
      (error) => {
        console.error('Voting error:', error)
      }
    )
  }
 */

  onVotar() {
    const users = this.storageService.getUser();
    let userId = users.id;
    let idCandidateId = this.candidate.id    
    this.authService.votar(userId, idCandidateId).subscribe(
      (response) => {
        console.log(response);
        
      }  
    )
  }
}

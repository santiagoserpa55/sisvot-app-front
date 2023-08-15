import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CandidateDTO } from 'src/app/models/candidate-dto'
import axios from 'axios'

@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss'],
})
export class CandidateCardComponent {
  @Input()
  // candidate: any = {};
  candidate: CandidateDTO = {}

  @Input()
  candidateIndex = 0

  @Output()
  delete: EventEmitter<CandidateDTO> = new EventEmitter<CandidateDTO>()
  @Output()
  votar: EventEmitter<CandidateDTO> = new EventEmitter<CandidateDTO>()
  @Output()
  update: EventEmitter<CandidateDTO> = new EventEmitter<CandidateDTO>()

  /*   get candidateImage(): string {
      const gender = this.candidate.gender === 'MALE' ? 'men' : 'women';
      return `https://randomuser.me/api/portraits/${gender}/${this.candidateIndex}.jpg`;
    } */

  onDelete() {
    this.delete.emit(this.candidate)
  }
  onUpdate() {
    this.update.emit(this.candidate)
  }

  onVotar() {
    this.votar.emit(this.candidate)
    let idCandidate = this.candidate._id
    console.log(idCandidate)
    // Obtener el valor del local storage
    var userDataJSON = localStorage.getItem('user')
    if (userDataJSON !== null) {
      // Parsear el valor JSON a un objeto JavaScript
      var userData = JSON.parse(userDataJSON)
      // Acceder al valor del user_id
      var userId = userData.user_id
      console.log(userId)
    } else {
      console.log('No se encontró ningún dato de usuario en el local storage.')
    }

    // Datos para la solicitud POST
    const data = {
      usuario: {
        _id: userId,
      },
      candidato: {
        _id: idCandidate,
      },
    }

    // Realizar la solicitud POST al backend
    axios
      .post('http://localhost:8082/votar', data)
      .then((response: { data: any }) => {
        console.log('Votación exitosa:', response.data)
      })
      .catch((error: any) => {
        console.error('Error en la votación:', error)
      })
  }
}

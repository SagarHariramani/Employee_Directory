import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-alphabetical-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alphabetical-filter.component.html',
  styleUrl: './alphabetical-filter.component.css'
})
export class AlphabeticalFilterComponent {
  @Output() selectedAlphabet= new EventEmitter<string|null>();
  alphabetSelected:string|null=null;
  alphabets:string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  
  emitSelectedAlphabet(alphabet:string){
    this.alphabetSelected=alphabet;
    this.selectedAlphabet.emit(alphabet);
  }

  resetAlphabeticalFilter(){
    this.alphabetSelected=null;
    this.selectedAlphabet.emit(null);
  }

}

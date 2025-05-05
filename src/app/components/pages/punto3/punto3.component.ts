import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink} from '@angular/router';
import { WordsCollection } from '../../../utils/words-collection';
declare var bootstrap: any;
@Component({
  selector: 'app-punto3',
  imports: [CommonModule, RouterLink],
  templateUrl: './punto3.component.html',
  styleUrl: './punto3.component.css'
})
export class Punto3Component implements OnInit{
  
  constructor(private _route: ActivatedRoute) { }
  
  category ?: string

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.category = params["category"]
    })
    this.init()
    this.selectWord()
  }

 hangmanImages: string[] = [
    "assets/img/ahorcado/init.jpeg",
    "assets/img/ahorcado/try-1.jpeg",
    "assets/img/ahorcado/try-2.jpeg",
    "assets/img/ahorcado/try-3.jpeg",    
    "assets/img/ahorcado/try-4.jpeg",
    "assets/img/ahorcado/try-5.jpeg",
    "assets/img/ahorcado/loss.jpeg",
  ]

  letters: string[] = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
  ]

  lastIndex = -1
  currIndex ?: number

  wordsColecction: WordsCollection = new WordsCollection()
  selectedWord ?: string
  wordToGuess?: string

  try!: number;
  usedLetters: string[] = []
  gameFinished ?: boolean
  
  init(){
    this.try = 6;
    this.usedLetters = [];
    this.gameFinished = false
  }

  selectWord(){
    this.currIndex = Math.floor(Math.random() * 3)
    while(this.currIndex === this.lastIndex){
      this.currIndex = Math.floor(Math.random() * 3)
    }
    const filterWords = this.wordsColecction.words.filter(w => w.category === this.category)
    this.selectedWord = filterWords[this.currIndex].word
    this.lastIndex = this.currIndex
    this.maskWord()
  }

  maskWord(){
    this.wordToGuess = this.selectedWord!.split("").map((l) => l !== " " ? "_" : l).join("")
  }

  check( letter : string){
    this.usedLetters.push(letter)
    let cont = 0
    for(let i = 0; i < this.selectedWord!.length; i++){
      if(this.selectedWord![i] === letter){
        cont++
        this.wordToGuess = this.wordToGuess?.split("").map((l, index) => index === i ? letter : l).join("") || ""
      }
    }
    if(cont === 0){
      this.try--
      if(this.try === 0){
        this.gameFinished = true
        this.showLossModal()
      }
    }
    else if (this.wordToGuess === this.selectedWord){
      this.gameFinished = true
      this.showWinModal()
    }
  }

  changeWord(){
    this.init()
    this.selectWord()
  }

  playAgain(){
    this.init()
    this.wordToGuess = this.selectedWord!.split("").map((l) => l !== " " ? "_" : l).join("")
  }

  /*Hover de boton hacia atras*/
  hover = false;
 
  /*Modales*/
  @ViewChild('lossModal') lossModal!: ElementRef
  @ViewChild('winModal') winModal!: ElementRef

  showLossModal() {
    const modalElement = this.lossModal.nativeElement
    const modal = new bootstrap.Modal(modalElement)
    modal.show()
  }

  showWinModal() {
    const modalElement = this.winModal.nativeElement
    const modal = new bootstrap.Modal(modalElement)
    modal.show()
  }

}

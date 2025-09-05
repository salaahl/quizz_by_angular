import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Question } from './questionInterface';
import * as animation from '../animations/animations';

declare let myExtJs: any;

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.sass'],
    animations: [animation.fadeSlideInOut()],
    standalone: false
})
export class QuestionsComponent {
  fadeAnimationState: 'default' | 'fadeIn' = 'fadeIn';
  // Cette donnée est initialisée ici et REMONTEE au appComponent (enfant vers parent)
  @Output() showCatalogEvent = new EventEmitter<boolean>();
  i: number = 0;
  answerStatus: boolean = false;
  answers: any[] = [];
  answerNumber: string[] = [
    'answer-one',
    'answer-two',
    'answer-three',
    'answer-four',
  ];
  quizzResult: number = 0;

  // Cette variable sera initialisée PAR le appComponent (parent vers enfant)
  @Input() questions: Question[] = [];

  reinitialise(catalogSwitch: boolean) {
    this.showCatalogEvent.emit(catalogSwitch);
  }

  get question() {
    return this.questions[this.i];
  }

  checkAnswer() {
    if (document.querySelector('input[name="answer"]:checked')) {
      if (
        (<HTMLInputElement>(
          document.querySelector('input[name="answer"]:checked')
        )).value == this.questions[this.i].right_answer.index
      ) {
        this.answerStatus = true;
        this.quizzResult = this.quizzResult + 20 / this.questions.length;
      } else {
        this.answerStatus = false;
      }
      (<NodeListOf<HTMLInputElement>>(
        document.querySelectorAll('input[name="answer"]')
      )).forEach((label) => {
        if (label.value == this.questions[this.i].right_answer.index) {
          (<HTMLElement>label.parentNode).classList.add('correct-answer');
        } else {
          (<HTMLElement>label.parentNode).classList.add('wrong-answer');
        }
      });
      (<HTMLInputElement>(
        document.querySelector('#answers')
      )).style.pointerEvents = 'none';
      (<HTMLInputElement>(
        document.querySelector('#validate-answer')
      )).style.pointerEvents = 'none';
      this.question.done = true;
    } else {
      alert('Veuillez sélectionner une réponse.');
    }
  }

  nextQuestion() {
    this.answers.push({
      question_index: this.i,
      answer_index: (<HTMLInputElement>(
        document.querySelector('input[name="answer"]:checked')
      )).value,
    });
    (<HTMLInputElement>document.querySelector('#answers')).style.pointerEvents =
      'auto';
    (<HTMLInputElement>(
      document.querySelector('#validate-answer')
    )).style.pointerEvents = 'auto';
    this.i = this.i + 1;
    this.fadeAnimationState = 'default';
    this.fadeAnimationState = 'fadeIn';
  }
}

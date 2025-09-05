import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import * as animation from '../../animations/animations';

@Component({
    selector: 'app-quizz',
    imports: [],
    templateUrl: './quizz.component.html',
    styleUrls: ['./quizz.component.sass'],
    animations: [animation.rotateY()]
})
export class QuizzComponent implements OnInit {
  API_BASE_URL = 'https://opentdb.com/api.php?amount=10&';

  category!: string;
  level!: string;
  i: number = 0;

  questions: any[] = [];
  question: string = '';
  questionType!: 'boolean' | 'multiple';
  answers: string[] = [];
  goodAnswer: string = '';

  questionStatus: boolean = false;
  answerStatus: string | null = null;

  constructor(private route: ActivatedRoute) {}

  async getQuestions() {
    try {
      const response = await fetch(
        this.API_BASE_URL +
          'category=' +
          this.category +
          '&difficulty=' +
          this.level,
      );
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut: ${response.status}`);
      }

      const data = await response.json();

      // Mettre la logique de traduction ici ou dans le initializeQuestion

      return data.results;
    } catch (error) {
      console.error('Erreur lors de la récupération des questions :', error);
    }
  }

  decodeHtml(html: string): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  async ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.category = decodeURIComponent(params.get('category_id')!);
      this.level = params.get('level')!;
    });

    const data = await this.getQuestions();

    this.questions = this.shuffleArray(data);

    this.initializeQuestion();
  }

  initializeQuestion() {
    this.question = this.decodeHtml(this.questions[this.i].question);
    this.questionType = this.questions[this.i].type;
    this.goodAnswer = this.decodeHtml(this.questions[this.i].correct_answer);

    this.answers = [];
    this.questions[this.i].incorrect_answers.forEach((answer: string) => {
      this.answers.push(this.decodeHtml(answer));
    });

    // Insertion de la bonne réponse au hasard dans le tableau des questions
    this.answers = this.shuffleArray([...this.answers, this.goodAnswer]);

    this.questionStatus = false;
    this.answerStatus = null;
  }

  checkAnswer() {
    // Appliquer la logique des bonnes réponses multiples ici
    if (
      (<HTMLInputElement>document.querySelector('input[name="answer"]:checked'))
        .value == this.goodAnswer
    ) {
      this.answerStatus = 'true';
    } else {
      this.answerStatus = 'false';
    }

    this.answers.forEach((answer) => {
      if (answer == this.goodAnswer) {
        (<HTMLElement>(
          document.querySelector(
            '#answer-' + this.answers.indexOf(answer) + '+ label',
          )
        )).style.backgroundColor = 'hsla(160, 100%, 37%, 1)';
      } else {
        (<HTMLElement>(
          document.querySelector(
            '#answer-' + this.answers.indexOf(answer) + '+ label',
          )
        )).style.backgroundColor = 'indianred';
      }
    });

    this.questionStatus = true;
  }

  nextQuestion() {
    this.i++;
    this.initializeQuestion();
  }
}

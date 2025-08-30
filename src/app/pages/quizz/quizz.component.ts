import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.sass'],
})
export class QuizzComponent implements OnInit {
  API_URL = 'https://quizzapi.jomoreschi.fr/api/v1/quiz?category=';

  category!: string;
  level!: string;
  i: number = 0;

  questions: any[] = [];
  question: string = '';
  answers: string[] = [];
  goodAnswer: string = '';

  questionStatus: boolean = false;
  answerStatus: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.category = decodeURIComponent(params.get('category')!);
      this.level = params.get('level')!;
      // Ici tu peux appeler l'API avec category et level
      fetch(this.API_URL + this.category + '&difficulty=' + this.level)
        .then((response) => response.json())
        .then((data) => {
          this.questions = data.quizzes;
          this.initializeQuestion();
        });
    });
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  initializeQuestion() {
    this.question = this.questions[this.i].question;
    this.goodAnswer = this.questions[this.i].answer;

    // Insertion de la bonne réponse au hasard dans le tableau des questions
    this.answers = this.shuffleArray([
      ...this.questions[this.i].badAnswers,
      this.goodAnswer,
    ]);

    this.questionStatus = false;
  }

  checkAnswer() {
    if (
      (<HTMLInputElement>document.querySelector('input[name="answer"]:checked'))
        .value == this.goodAnswer
    ) {
      this.answerStatus = true;
    } else {
      this.answerStatus = false;
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as animation from '../../animations/animations';
import { TranslateService } from '../../services/deepl.service';

@Component({
  selector: 'app-quizz',
  imports: [],
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.sass'],
  animations: [animation.rotateY()],
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
  score: number = 0;

  constructor(
    private route: ActivatedRoute,
    private translateService: TranslateService
  ) {}

  async getQuestions() {
    try {
      const response = await fetch(
        this.API_BASE_URL +
          'category=' +
          this.category +
          '&difficulty=' +
          this.level
      );
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut: ${response.status}`);
      }

      const data = await response.json();

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

    await this.initializeQuestion();
  }

  async initializeQuestion() {
    // Réinitialisation des différents statuts
    this.questionStatus = false;
    this.answerStatus = null;

    this.question = this.decodeHtml(this.questions[this.i].question);
    this.questionType = this.questions[this.i].type;
    this.goodAnswer = this.decodeHtml(this.questions[this.i].correct_answer);

    this.answers = [];
    this.questions[this.i].incorrect_answers.forEach((answer: string) => {
      this.answers.push(this.decodeHtml(answer));
    });

    // Traduction du texte
    try {
      const data =
        this.question +
        '<SEP1>' +
        this.goodAnswer +
        '<SEP2>' +
        this.answers.join('|');
      const result = await this.translateService.translate(data, 'FR');

      // Récupération du texte traduit et assignation
      this.question = result.translations[0].text.split('<SEP1>')[0];
      this.goodAnswer = result.translations[0].text
        .split('<SEP1>')[1]
        .split('<SEP2>')[0];
      this.answers = result.translations[0].text
        .split('<SEP1>')[1]
        .split('<SEP2>')[1]
        .split('|');
    } catch (error) {
      console.warn('Erreur lors de la traduction :', error);
    }

    // Insertion de la bonne réponse au hasard dans le tableau des questions
    this.answers = this.shuffleArray([...this.answers, this.goodAnswer]);
  }

  checkAnswer() {
    // Appliquer la logique des bonnes réponses multiples ici
    if (
      (<HTMLInputElement>document.querySelector('input[name="answer"]:checked'))
        .value == this.goodAnswer
    ) {
      this.answerStatus = 'true';
      this.score = this.score + 20 / this.questions.length;
    } else {
      this.answerStatus = 'false';
    }

    this.answers.forEach((answer) => {
      if (answer == this.goodAnswer) {
        (<HTMLElement>(
          document.querySelector(
            '#answer-' + this.answers.indexOf(answer) + '+ label'
          )
        )).style.backgroundColor = 'hsla(160, 100%, 37%, 1)';
      } else {
        (<HTMLElement>(
          document.querySelector(
            '#answer-' + this.answers.indexOf(answer) + '+ label'
          )
        )).style.backgroundColor = 'indianred';
      }
    });

    this.questionStatus = true;
  }

  async nextQuestion() {
    this.i++;
    await this.initializeQuestion();
  }
}

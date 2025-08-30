import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as animation from './animations/animations';
import * as questionBank from './questions/questionBank/questions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [animation.fadeSlideInOut(), animation.fadeIn()],
})
export class AppComponent {
  title: string = 'Quizz';

  // Le traitement de cette variable se trouve dans le questionsComponent
  questions = questionBank;
  show: boolean = true;

  // Le clic sur un bouton injectera un catalogue dans cette variable
  questionsCatalog: any = null;

  catalogs: any[] = [
    {
      name: "Retour à l'école",
      questions: this.questions.backToSchool,
      show: this.show,
    },
    {
      name: 'Securité routière',
      questions: this.questions.securiteRoutiere,
      show: this.show,
    },
  ];

  showCatalog(catalogSwitch: boolean) {
    this.show = catalogSwitch;
    this.catalogs.forEach((catalog) => {
      catalog.show = false;
    });
  }

  getRouterOutletState(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'] || 'any';
  }
}

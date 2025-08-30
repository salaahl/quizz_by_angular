import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { categoriesBank } from 'src/app/questions/questionBank/questions';
import * as animation from '../../animations/animations';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass'],
  animations: [animation.fadeSlideInOut(), animation.fadeIn()],
})
export class CategoriesComponent {
  categories: any =
    window.innerWidth < 768
      ? categoriesBank.slice(0, 9)
      : categoriesBank.slice(0, 18);

  category_selected: string = this.categories[0].technical_name;

  constructor(private router: Router) {}

  showCategory() {
    // Redirige vers la page quizz avec la catégorie en paramètre
    this.router.navigate(['categories/', this.category_selected]);
  }
}

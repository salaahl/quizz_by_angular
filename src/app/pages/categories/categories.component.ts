import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { categoriesBank } from 'src/app/questions/questionBank/questions';
import * as animation from '../../animations/animations';

@Component({
    selector: 'app-categories',
    imports: [CommonModule, RouterModule],
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.sass'],
    animations: [animation.fadeSlideInOut()]
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

  async getCategories() {
    try {
      const response = await fetch('https://opentdb.com/api_category.php');
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut: ${response.status}`);
      }

      const data = await response.json();

      // Mettre la logique de traduction ici

      return data.trivia_categories;
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories :', error);
    }
  }

  async ngOnInit() {
    this.categories = await this.getCategories();
  }
}

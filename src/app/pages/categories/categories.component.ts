import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as animation from '../../animations/animations';
import { translatedCategories } from '../categories/categories/categories';

@Component({
  selector: 'app-categories',
  imports: [RouterModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass'],
  animations: [animation.fadeSlideInOut()],
})
export class CategoriesComponent {
  categories!: any;

  async ngOnInit() {
    this.categories = await this.getCategories();

    // Injection des catégories traduites
    this.categories.forEach((category: any, index: number) => {
      category.name = translatedCategories[category.id];
    });
  }

  async getCategories() {
    try {
      const response = await fetch('https://opentdb.com/api_category.php');
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut: ${response.status}`);
      }

      const data = await response.json();

      return data.trivia_categories;
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories :', error);
    }
  }
}

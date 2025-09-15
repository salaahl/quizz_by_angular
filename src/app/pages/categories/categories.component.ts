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

  async getCategories(maxRetries = 2, attempt = 1): Promise<any[]> {
    try {
      const response = await fetch('https://opentdb.com/api_category.php');
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut: ${response.status}`);
      }

      const data = await response.json();

      return data.trivia_categories;
    } catch (error) {
      console.error(
        `Erreur lors de la récupération des catégories (tentative ${attempt}) :`,
        error
      );

      if (attempt < maxRetries) {
        // Attendre trois secondes avant de réessayer
        await new Promise((resolve) => setTimeout(resolve, 3000 * attempt));
        return this.getCategories(maxRetries, attempt + 1);
      } else {
        throw error; // abandon après x tentatives
      }
    }
  }
}

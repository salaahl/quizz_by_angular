import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import * as animation from '../../animations/animations';
import { translatedCategories } from '../categories/categories/categories';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  animations: [animation.fadeSlideInOut()],
})
export class HomeComponent implements OnInit {
  categories!: any;

  constructor(private router: Router) {}

  async ngOnInit() {
    this.categories = await this.getCategories();
  }

  async getCategories(maxRetries = 2, attempt = 1): Promise<any[]> {
    try {
      const response = await fetch('https://opentdb.com/api_category.php');
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut: ${response.status}`);
      }

      const data = await response.json();

      const categories =
        window.innerWidth < 768
          ? data.trivia_categories.slice(0, 6)
          : data.trivia_categories.slice(0, 18);

      categories.forEach((category: any, index: number) => {
        // Injection des catégories traduites
        category.name = translatedCategories[category.id];
      });

      return categories;
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

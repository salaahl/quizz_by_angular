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

  async getCategories() {
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
      console.error('Erreur lors de la récupération des catégories :', error);
      return [];
    }
  }
}

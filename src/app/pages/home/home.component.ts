import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import * as animation from '../../animations/animations';
import { categoriesBank } from 'src/app/questions/questionBank/questions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  animations: [animation.fadeSlideInOut(), animation.fadeIn()],
})
export class HomeComponent {
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

      // Mettre la logique de traduction ici

      return window.innerWidth < 768
        ? data.trivia_categories.slice(0, 6)
        : data.trivia_categories;
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories :', error);
    }
  }
}

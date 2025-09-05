import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import * as animation from '../../animations/animations';
import { DeepLService } from '../../services/deepl.service';

@Component({
    selector: 'app-home',
    imports: [CommonModule, RouterModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass'],
    animations: [animation.fadeSlideInOut()]
})
export class HomeComponent implements OnInit {
  categories!: any;

  constructor(
    private router: Router,
    private deepLService: DeepLService,
  ) {}

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

      const originalCategories = data.trivia_categories;
      console.log(originalCategories);
      const categoryNames = data.trivia_categories.map(
        (categorie: any) => categorie.name,
      );

      let catString = categoryNames.join('|');

      // Traduction
      this.deepLService.translateText(catString, 'FR').subscribe({
        next: (result) => {
          // Le texte traduit est accessible dans result.translations[0].text
          console.log(result.translations[0].text);
          console.log(
            'Langue détectée:',
            result.translations[0].detected_source_language,
          );
        },
        error: (error) => {
          console.error('Translation error:', error);
        },
      });

      originalCategories.forEach((category: any, index: number) => {
        category.name = catString.split('|')[index];
      });

      console.log(originalCategories);

      return window.innerWidth < 768
        ? data.trivia_categories.slice(0, 6)
        : data.trivia_categories.slice(0, 18);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories :', error);
      return [];
    }
  }
}

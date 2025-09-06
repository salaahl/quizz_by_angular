import { Component, OnInit } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import * as animation from '../../animations/animations';
import { TranslateService } from '../../services/deepl.service';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  animations: [animation.fadeSlideInOut()],
})
export class HomeComponent implements OnInit {
  categories!: any;

  constructor(
    private router: Router,
    private translateService: TranslateService
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
      const categoryNames = originalCategories.map(
        (categorie: any) => categorie.name
      );

      let catString =
        window.innerWidth < 768
          ? categoryNames.slice(0, 6).join('|')
          : categoryNames.slice(0, 18).join('|');

      // Traduction
      this.translateService.translate(catString, 'FR').subscribe({
        next: (result) => {
          // Le texte traduit est accessible dans result.translations[0].text
          catString = result.translations[0].text;
        },
        error: (error) => {
          console.error('Translation error:', error);
        },
      });

      originalCategories.forEach((category: any, index: number) => {
        category.name = catString.split('|')[index];
      });

      return window.innerWidth < 768
        ? originalCategories.slice(0, 6)
        : originalCategories.slice(0, 18);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories :', error);
      return [];
    }
  }
}

import { Component } from '@angular/core';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';
import * as animation from '../../animations/animations';

@Component({
    selector: 'app-category',
    imports: [RouterModule],
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.sass'],
    animations: [animation.fadeSlideInOut()]
})
export class CategoryComponent implements OnInit {
  API_BASE_URL = 'https://opentdb.com/api.php?amount=10&';

  // Récupérer également le nom "lisible" de la catégorie pour affichage
  category_id!: number;
  category_name!: string;

  levels!: any;
  difficulty!: string[];
  level_selected!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  async ngOnInit() {
    this.category_id = this.route.snapshot.params['category_id'];
    this.category_name = decodeURIComponent(
      this.route.snapshot.params['category_name'],
    );

    await this.getLevels();
console.log(this.levels);
    this.difficulty = ['easy', 'medium', 'hard'].filter((item) =>
      this.levels.some((level: any) => level.difficulty === item),
    );
    this.level_selected = this.difficulty[0];
  }

  async getLevels() {
    try {
      const response = await fetch(
        this.API_BASE_URL + 'category=' + this.category_id,
      );
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);


      this.levels = data.results;
    } catch (error) {
      console.error('Erreur lors de la récupération des questions :', error);
    }
  }
}

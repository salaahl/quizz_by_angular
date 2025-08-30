import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { categoriesBank } from 'src/app/questions/questionBank/questions';
import * as animation from '../../animations/animations';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.sass'],
  animations: [animation.fadeSlideInOut(), animation.fadeIn()],
})
export class CategoryComponent implements OnInit {
  // Récupérer également le nom "lisible" de la catégorie pour affichage
  category!: string;
  difficulty: string[] = ['facile', 'moyen', 'difficile'];
  level_selected: string = 'facile';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.category =
        categoriesBank.find((c) => c.technical_name === params.get('category'))
          ?.name || decodeURIComponent(params.get('category')!);
    });
  }

  showQuizz() {
    // Redirige vers la page quizz avec la catégorie en paramètre
    this.router.navigate([
      'categories/',
      this.route.snapshot.params['category'],
      this.level_selected,
    ]);
  }
}

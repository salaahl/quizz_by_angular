import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { categoriesBank } from 'src/app/questions/questionBank/questions';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass'],
})
export class CategoriesComponent {
  categories: any =
    window.innerWidth < 768
      ? categoriesBank.slice(0, 9)
      : categoriesBank.slice(0, 18);
  difficulty: string[] = ['facile', 'moyen', 'difficile'];

  category_selected: string = this.categories[0].technical_name;
  level_selected: string = 'facile';

  constructor(private router: Router) {}

  showQuizz() {
    // Redirige vers la page quizz avec la catégorie en paramètre
    this.router.navigate([
      'categories/',
      this.category_selected,
      this.level_selected,
    ]);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';
import * as animation from '../../animations/animations';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.sass'],
  animations: [animation.fadeSlideInOut(), animation.fadeIn()],
})
export class CategoryComponent implements OnInit {
  // Récupérer également le nom "lisible" de la catégorie pour affichage
  category_id!: number;
  category_name!: string;

  difficulty: string[] = ['easy', 'medium', 'hard'];
  level_selected: string = 'easy';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.category_id = this.route.snapshot.params['category_id'];
    this.category_name = decodeURIComponent(this.route.snapshot.params['category_name']);
  }
}

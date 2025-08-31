import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryComponent } from './pages/category/category.component';
import { QuizzComponent } from './pages/quizz/quizz.component';

const routes: Routes = [
  {
    path: '',
    data: { animation: 'fadeSlideInOut' },
    component: HomeComponent,
  },
  {
    path: 'categories',
    data: { animation: 'fadeSlideInOut' },
    component: CategoriesComponent,
  },
  {
    path: 'categories/:category_id/:category_name',
    data: { animation: 'fadeSlideInOut' },
    component: CategoryComponent,
  },
  {
    path: 'categories/:category_id/:category_name/:level',
    data: { animation: 'fadeSlideInOut' },
    component: QuizzComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

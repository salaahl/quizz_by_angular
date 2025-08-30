import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryComponent } from './pages/category/category.component';
import { QuizzComponent } from './pages/quizz/quizz.component';

const routes: Routes = [
  {
    path: '',
    data: { animation: 'fadeInOut' },
    component: HomeComponent,
  },
  {
    path: 'categories',
    data: { animation: 'fadeInOut' },
    component: CategoriesComponent,
  },
  {
    path: 'categories/:category_id/:category_name',
    data: { animation: 'fadeInOut' },
    component: CategoryComponent,
  },
  {
    path: 'categories/:category_id/:category_name/:level',
    data: { animation: 'fadeInOut' },
    component: QuizzComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

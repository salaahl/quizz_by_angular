import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryComponent } from './pages/category/category.component';
import { QuizzComponent } from './pages/quizz/quizz.component';

const routes: Routes = [
  {
    path: 'categories',
    data: { animation: 'categories' },
    component: CategoriesComponent,
  },
  {
    path: 'categories/:category',
    data: { animation: 'level' },
    component: CategoryComponent,
  },
  {
    path: 'categories/:category/:level',
    data: { animation: 'quizz' },
    component: QuizzComponent,
  },
  { path: '', redirectTo: 'categories', pathMatch: 'full' }, // redirection vers /categories par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

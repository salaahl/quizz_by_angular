import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './pages/categories/categories.component';
import { QuizzComponent } from './pages/quizz/quizz.component';

const routes: Routes = [
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/:category/:level', component: QuizzComponent },
  { path: '', redirectTo: 'categories', pathMatch: 'full' }, // redirection vers /categories par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

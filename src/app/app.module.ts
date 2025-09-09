import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionsComponent } from './pages/archives/questions.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, QuestionsComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}

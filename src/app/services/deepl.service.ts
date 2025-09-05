import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface DeepLResponse {
  translations: Array<{
    detected_source_language: string;
    text: string;
  }>;
}

@Injectable({ providedIn: 'root' })
export class TranslateService {
  // Point vers votre API Symfony en production
  private apiUrl = 'https://jokes-api-platform.onrender.com/translate';

  constructor(private http: HttpClient) {}

  translate(text: string, targetLang: string): Observable<DeepLResponse> {
    // Le backend Symfony attend un body JSON avec text et target_lang
    const body = { text, target_lang: targetLang };
    return this.http.post<DeepLResponse>(this.apiUrl, body);
  }
}

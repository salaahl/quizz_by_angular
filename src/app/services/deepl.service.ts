import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface DeepLTranslationResponse {
  translations: Array<{
    detected_source_language: string;
    text: string;
    billed_characters?: number;
    model_type_used?: string;
  }>;
}

interface DeepLLanguageDetectionResponse {
  language: string;
  confidence: number;
}

@Injectable({
  providedIn: 'root',
})
export class DeepLService {
  private apiUrl = 'https://api-free.deepl.com';
  private authKey = '565ab08f-996f-40aa-8a7e-5781a760e755:fx';

  constructor(private http: HttpClient) {}

  translateText(
    text: string,
    targetLang: string,
    sourceLang?: string,
  ): Observable<DeepLTranslationResponse> {
    const headers = new HttpHeaders({
      Authorization: `DeepL-Auth-Key ${this.authKey}`, // ✅ Nouvelle méthode d'authentification
      'Content-Type': 'application/json',
    });

    const body = {
      text: [text], // ✅ DeepL attend un tableau de chaînes
      target_lang: targetLang.toUpperCase(), // ✅ DeepL utilise des codes en majuscules
      ...(sourceLang && { source_lang: sourceLang.toUpperCase() }),
    };

    return this.http.post<DeepLTranslationResponse>(
      `${this.apiUrl}/v2/translate`,
      body,
      { headers },
    );
  }

  // DeepL n'a pas d'endpoint de détection de langue séparé
  // Vous pouvez utiliser la traduction avec source_lang omis pour détecter automatiquement
  detectLanguageViaTranslation(
    text: string,
    targetLang: string = 'EN',
  ): Observable<DeepLTranslationResponse> {
    const headers = new HttpHeaders({
      Authorization: `DeepL-Auth-Key ${this.authKey}`,
      'Content-Type': 'application/json',
    });

    const body = {
      text: [text],
      target_lang: targetLang.toUpperCase(),
      // Pas de source_lang = détection automatique
    };

    return this.http.post<DeepLTranslationResponse>(
      `${this.apiUrl}/v2/translate`,
      body,
      { headers },
    );
  }

  // Méthode pour obtenir les langues supportées
  getSupportedLanguages(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `DeepL-Auth-Key ${this.authKey}`,
    });

    return this.http.get(`${this.apiUrl}/v2/languages`, { headers });
  }

  // Méthode pour vérifier l'utilisation de l'API
  getUsage(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `DeepL-Auth-Key ${this.authKey}`,
    });

    return this.http.get(`${this.apiUrl}/v2/usage`, { headers });
  }
}

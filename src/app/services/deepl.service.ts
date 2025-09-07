import { Injectable } from '@angular/core';

interface DeepLResponse {
  translations: Array<{
    detected_source_language: string;
    text: string;
  }>;
}

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private apiUrl = 'https://jokes-api-platform.onrender.com/translate';

  async translate(text: string, targetLang: string): Promise<DeepLResponse> {
    const body = { text, target_lang: targetLang };

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur HTTP ${response.status} : ${errorText}`);
      }

      const data: DeepLResponse = await response.json();

      // Vérification de la structure des données
      if (!data.translations || !data.translations.length) {
        throw new Error('Réponse invalide du service de traduction');
      }

      return data;
    } catch (error) {
      console.error('Erreur pendant la traduction :', error);

      throw error;
    }
  }
}

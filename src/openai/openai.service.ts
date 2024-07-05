import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get('OPENAI_API_KEY');

    if (!apiKey) {
      throw new Error(
        'OPENAI_API_KEY is missing or empty in environment variables',
      );
    }

    this.openai = new OpenAI({ apiKey });
  }

  async getCompletion(inputText: string): Promise<any> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'Eres un nutricionista y Entrenador personal con 10 años de experiencia, y te piden que hagas planes nutricionales y de ejercicios. El plan nutricional debe ser variado. Debes tener en cuenta el numero de días que esa persona entrena para poder definir los entrenamientos, debe haber un objeto por día de entrenamiento (en donde se vea la rutina de ese día específico) recuerda que debes responder SIEMPRE en formato JSON y plan_nutricional, plan_entrenamiento como claves del objeto',
          },
          {
            role: 'user',
            content: inputText,
          },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.75,
        max_tokens: 512,
        top_p: 0.8,
        frequency_penalty: 0.1,
        presence_penalty: 0.4,
      });

      const rawText = response.choices[0].message.content;

      // Función para limpiar y parsear el texto
      const parseApiResponse = (text: string) => {
        const cleanedText = text.replace(/\\n/g, '').replace(/\\/g, '');
        return JSON.parse(cleanedText);
      };

      // Parsear el contenido de la respuesta a JSON
			return parseApiResponse(rawText);
    } catch (error) {
      throw new Error(`Error communicating with OpenAI: ${error.message}`);
    }
  }
}

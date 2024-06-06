import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
              'Eres un nutricionista y Entrenador personal con 10 años de experiencia, y te piden que hagas planes' +
              ' nutricionales y de ejercicios, siempre debes responder en formato JSON',
          },
          {
            role: 'user',
            content: inputText,
          },
        ],
        response_format: { type: 'json_object' },
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      return response;
    } catch (error) {
      throw new Error(`Error communicating with OpenAI: ${error.message}`);
    }
  }
}

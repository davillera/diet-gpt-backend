import { Controller, Post, Body } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('completion')
  async getCompletion(
    @Body()
    requestBody: {
      sex: string;
      age: number;
      weight: number;
      height: number;
      typeBody: string;
      exerciseFrequency: number;
      goal: string;
    },
  ): Promise<any> {
    try {
      const { sex, age, weight, height, typeBody, exerciseFrequency, goal } =
        requestBody;
      const prompt = `género ${sex}, edad ${age}, altura ${height}cm con un tipo de cuerpo ${typeBody} y peso de 
      ${weight}Kg, con una frecuencia semanal de ${exerciseFrequency} y objetivo de ${goal}`;

      if (!prompt) {
        throw new Error('inputText is missing or empty');
      }

      const completion = await this.openaiService.getCompletion(prompt);
      return { completion };
    } catch (error) {
      return { error: error.message };
    }
  }
}

import { Controller, Post, Body } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('completion')
  async getCompletion(@Body() requestBody: { prompt: string }): Promise<any> {
    try {
      const { prompt } = requestBody;

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

import { Controller, Post, Body } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('completion')
  async getCompletion(@Body() requestBody: { promt: string }): Promise<any> {
    try {
      const { promt } = requestBody;

      if (!promt) {
        throw new Error('inputText is missing or empty');
      }

      const completion = await this.openaiService.getCompletion(promt);
      return { completion };
    } catch (error) {
      return { error: error.message };
    }
  }
}

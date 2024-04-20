import { Controller, Post, Body } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('completion')
  async getCompletion(
    @Body() requestBody: { inputText: string },
  ): Promise<any> {
    try {
      const { inputText } = requestBody;

      if (!inputText) {
        throw new Error('inputText is missing or empty');
      }

      const completion = await this.openaiService.getCompletion(inputText);
      return { completion };
    } catch (error) {
      return { error: error.message };
    }
  }
}

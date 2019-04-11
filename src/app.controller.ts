import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('planetes')
  async getPlanetes(@Res() res: Response) {
    res.status(HttpStatus.OK).json(await this.appService.agetPlanetes());
  }
}

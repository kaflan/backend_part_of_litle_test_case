import { Injectable } from '@nestjs/common';
import * as request from 'request';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async agetPlanetes() {
    const urls: string[] = ['https://swapi.co/api/planets/?format=json'];
    const resultPlanets: any[] = [];
    while (urls.length > 0) {
      const url = urls.splice(0, 1).shift();
      const { next, results } = await this.getPlanetesUrls(url);
      if (next) {
        urls.push(next);
      }
      resultPlanets.push(...results);
    }
    return resultPlanets;
  }
  getPlanetesUrls(url: string): any {
    return new Promise((resolve, reject) => {
      request.get({ url }, (error, response, body) => {
        if (error) {
          reject(error);
          throw new Error(error);
        }

        const { next, results } = JSON.parse(body);
        resolve({ next, results });
      });
    });
  }
}

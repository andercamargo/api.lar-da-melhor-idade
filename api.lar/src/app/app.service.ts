import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRunning(): string {
    return 'App is running!';
  }
}

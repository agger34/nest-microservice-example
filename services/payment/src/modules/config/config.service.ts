import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class ConfigService {
  constructor(filePath: string) {
    const path = join(__dirname, '..', '..', '..', filePath);
    dotenv.config({ path });
  }

  get(key: string): string {
    return process.env[key];
  }
}

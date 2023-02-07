import { Injectable } from '@nestjs/common';
import { Request } from 'express';
@Injectable()
export class UploadsService {
  getFullPath(req: Request, file): string {
    return `${req.protocol}://${req.get('Host')}/api/uploads/${file.filename}`;
  }
}

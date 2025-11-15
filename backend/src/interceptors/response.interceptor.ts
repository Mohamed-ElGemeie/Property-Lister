import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response: any) => {
        // If not object, convert to data response
        if (typeof response !== 'object' || response === null) {
          return {
            success: true,
            code: 200,
            message: 'OK',
            data: response,
          };
        }

        // -------- Success handling --------
        const success =
          response.success !== undefined ? response.success : true;

        // Default code depends on success
        let code = response.code ? response.code : success ? 200 : 500;

        // -------- Message handling --------
        let message = response.message;

        if (!message) {
          switch (code) {
            case 400:
              message = 'Bad Request';
              break;
            case 401:
              message = 'Unauthorized';
              break;
            case 404:
              message = 'Resource Not Found';
              break;
            case 500:
              message = 'Server Error';
              break;
            default:
              message = 'OK';
          }
        }

        // Final formatted response
        return {
          success,
          code,
          message,
          data: response.data ?? null,
        };
      }),
    );
  }
}

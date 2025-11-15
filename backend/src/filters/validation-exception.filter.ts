import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse() as any;

    // Check if it's a validation error (array of messages)
    if (Array.isArray(exceptionResponse?.message)) {
      const errors: Record<string, string> = {};
      exceptionResponse.message.forEach((msg: string) => {
        const [field, ...rest] = msg.split(' ');
        errors[field] = msg;
      });

      response.status(status).json({
        success: false,
        code: status,
        message: 'Bad Request',
        data: null,
        errors,
      });
    } else {
      // Non-form validation error, just return the message
      response.status(status).json({
        success: false,
        code: status,
        message: exceptionResponse?.message || 'Bad Request',
        data: null,
      });
    }
  }
}

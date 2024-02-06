import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface CustomErrorException {
  message: string;
  statusCode: number;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((res: unknown) => this.responseHandler(res)),
      catchError((err: HttpException) =>
        throwError(() => this.errorHandler(err, context)),
      ),
    );
  }

  errorHandler(exception: HttpException, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorMessage =
      "Oops, something's not right. Our team is on it. Please hold tight and try again in a moment.";

    console.log(exception);

    if (exception instanceof HttpException) {
      errorMessage = exception.getResponse().toString();
    }

    if (exception instanceof BadRequestException) {
      errorMessage = exception.getResponse()['message'][0];
    }

    response.status(statusCode).json({
      success: false,
      message: errorMessage,
    });
  }

  responseHandler(res: any) {
    return res;
  }
}

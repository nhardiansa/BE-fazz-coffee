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
import { SuccessResponse } from './base-response';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, SuccessResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<SuccessResponse<T>> {
    return next.handle().pipe(
      map((data: SuccessResponse<T>) => {
        console.log(data);
        return this.responseHandler({
          success: true,
          message: data.message,
          result: data.result,
        });
      }),
      catchError((err: HttpException) =>
        throwError(() => this.errorHandler(err, context)),
      ),
    );
  }

  errorHandler(exception: HttpException, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    let statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorMessage =
      "Oops, something's not right. Our team is on it. Please hold tight and try again in a moment.";

    console.error('RESPONSE INTERCEPTOR', exception);

    if (exception instanceof PrismaClientKnownRequestError) {
      if (exception.code === 'P2025') {
        statusCode = HttpStatus.NOT_FOUND;
        errorMessage = 'Data not found';
      }
    }

    if (exception instanceof HttpException) {
      errorMessage = exception.message;
    }

    if (exception instanceof BadRequestException) {
      statusCode = HttpStatus.BAD_REQUEST;
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

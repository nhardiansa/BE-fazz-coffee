export interface BaseResponse {
  success: boolean;
  message: string;
}

export interface ErrorResponse extends BaseResponse {
  error: any;
}

export interface SuccessResponse<T> extends BaseResponse {
  result?: T;
}

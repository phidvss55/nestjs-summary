class ResponseData {
  readonly status: number;
  readonly message: string;
  readonly data: any;
  readonly code?: number;

  constructor(status: number, data: any, message?: string, code?: number) {
    this.status = status;
    this.message = message || 'Success';
    this.data = data;
    this.code = code;
  }
}

export default ResponseData;

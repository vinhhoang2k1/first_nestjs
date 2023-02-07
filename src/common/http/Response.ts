export class ResponseHttp<Data> {
  private status: boolean;
  private data: Data;
  private message: string;
  constructor(status: boolean = true, data: Data , message: string = '') {
    (this.status = status), (this.data = data), (this.message = message);
  }
  getResponse() {
    return {
      status: this.status,
      data: this.data,
      message: this.message,
    };
  }
}

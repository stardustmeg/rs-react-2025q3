class HttpError extends Error {
  public status: number;

  constructor(status: number, statusText: string) {
    super(`Error ${status}: ${statusText}`);
    this.status = status;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export default HttpError;

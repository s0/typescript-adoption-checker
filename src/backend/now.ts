export interface Request {
  url: string;
}

export interface Response {
  end(data: string): void;
}

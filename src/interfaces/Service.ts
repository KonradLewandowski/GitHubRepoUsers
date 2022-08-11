export interface Result {
  id: number;
  name: string;
  url: string;
}

export interface Service {
  (query: string): Promise<Result[]>;
}

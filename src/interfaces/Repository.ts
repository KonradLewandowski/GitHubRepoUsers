export interface Result {
  id: number;
  name: string;
  url: string;
}

export interface Repository {
  fetch: (query: string) => Promise<Result[]>;
}

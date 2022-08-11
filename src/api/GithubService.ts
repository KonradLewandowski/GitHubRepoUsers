interface User {
  id: number;
  login: string;
  name: string;
  html_url: string;
}

export interface GithubResponse {
  items: User[];
}

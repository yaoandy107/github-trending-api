export interface Repo {
  author: string;
  name: string;
  description: string | null;
  programmingLanguage: string;
  stars: number;
  forks: number;
  starsInRange: number;
}

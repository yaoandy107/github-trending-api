export interface Repo {
    author: string,
    name: string
    description: string|null,
    stars: number,
    forks: number,
    starsInRange: number
}
export interface Player {
    id?: number,
    uuid: string,
    name: string,
    primaryRank?: string | null,
    lastLogin: number
}
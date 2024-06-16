import { Path } from "./Types"

export type AddPathRequest = Path

export type FetchPathsRequest = {
    offset: number
    size: number
}
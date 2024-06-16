import { MaxSpeed, Surface } from "../../../connect/pathsApi/Types"

export type PointView = {
    id: string
    distance: number
    surface: Surface
    height: number
    maxSpeed: MaxSpeed
}

export type PathView = {
    id: string
    name: string
    points: PointView[]
}
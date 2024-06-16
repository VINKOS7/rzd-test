// Список возможных типов поверхности
export enum Surface {
    SAND, 
    ASPHALT, 
    GROUND
}
export enum MaxSpeed {
    FAST = "FAST",
    NORMAL = "NORMAL",
    SLOW = "SLOW"
}
  
  // Контрольная точка. Позиция в маршруте определяется в массиве маршрута
export type Point = {
    // id
    id: string
    // название
    name: string
    // Высота точки
    height: number
}
  
  // Отрезок. Определяет характеристики участка маршрута между 2 соседними точками  
export type Track = {
    // id первой точки
    firstId: string
    // id второй точки
    secondId: string
    // расстояние между точками
    distance: number
    // тип поверхности на отрезке
    surface: Surface
    // максимально допустимая скорость на отрезке
    maxSpeed: MaxSpeed
}

export type Path = {
    id: string
    name: string
    tracks: Track[]
}
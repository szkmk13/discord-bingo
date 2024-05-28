export interface ActivityLabel{
    [x:string]:string
}
export interface databaseBingoRow {
    order:string[]
    date:string
    completed:boolean
    marked:boolean[]
}
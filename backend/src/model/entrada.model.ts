export interface IEntrada {
    id: number, 
    placa: string,
    data_hora: Date,
    status_placa: IStatus
}

enum IStatus {
    APROVADO = 'APROVADO',
    DESCONHECIDO = 'DESCONHECIDO'
}
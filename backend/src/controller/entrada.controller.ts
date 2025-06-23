import { Request, Response } from 'express';
import { IGenericControler } from './generic.controller';
import { IEntrada } from '../model/entrada.model';
import { EntradaRepository } from '../repository/entrada.repository';


export class EntradaController implements IGenericControler{

    constructor(public repository: EntradaRepository){}

    async create(req: Request, res: Response): Promise<void> {
        const { id, placa, data_hora, status_placa} = req.body;
        const novaEntrada: IEntrada = {
            id: id, placa:placa, data_hora: data_hora, status_placa:status_placa,
            
        };
        const EntradaCriada = await this.repository.create(novaEntrada);
        res.json(EntradaCriada);
    }

    async getAll(req: Request, res: Response): Promise<void> {
        const Entradas = await this.repository.getAll();
        res.json(Entradas);
    }
}
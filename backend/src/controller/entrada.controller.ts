import { Request, Response } from 'express';
import { IGenericControler } from './generic.controller';
import { IEntrada } from '../model/entrada.model';
import { EntradaRepository } from '../repository/entrada.repository';

export class EntradaController implements IGenericControler {

    constructor(public repository: EntradaRepository) {}

    async create(req: Request, res: Response): Promise<void> {
        const { id, placa, data_hora, status_placa } = req.body;

        try {
            
            const entradasExistentes = await this.repository.findByPlaca(placa);

            if (entradasExistentes.length === 0) {
                res.status(404).json({ mensagem: "Placa não encontrada no banco de dados." });
                return;
            }

            const novaEntrada: IEntrada = {
                id: id,
                placa: placa,
                data_hora: data_hora,
                status_placa: status_placa,
            };

            const entradaCriada = await this.repository.create(novaEntrada);
            res.status(201).json(entradaCriada);

        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao criar entrada", erro: error });
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const entradas = await this.repository.getAll();
            res.json(entradas);
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao buscar entradas", erro: error });
        }
    }
}

import { Connection } from "mysql2/promise";
import { IGenericRepository } from "./generic.repository";
import { IEntrada } from "../model/entrada.model";

export class EntradaRepository implements IGenericRepository {
    constructor(public db: Connection) {}

    async create(entrada: IEntrada) {
        const query = "INSERT INTO entrada(placa, data_hora, status_placa) VALUES (?,?,?)";
        const values = [entrada.placa, entrada.data_hora, entrada.status_placa];
        const [result] = await this.db.query(query, values);
        entrada.id = (result as any).insertId;
        return entrada;
    }

    async getAll() {
        const query = "SELECT * FROM entrada";
        const [entradas] = await this.db.query(query);
        return entradas as IEntrada[];
    }

    async findByPlaca(placa: string) {
        const query = "SELECT * FROM entrada WHERE placa = ?";
        const [rows] = await this.db.query(query, [placa]);
        return rows as IEntrada[];
    }
}

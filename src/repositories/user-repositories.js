import pg from 'pg';
import { Bd_config } from './BD_Config';

export default class BD {
  constructor() {
    this.client = new pg.Client(Bd_config);
    this.client.connect();
  }

  async query(sql, values = []) {
    try {
      const response = await this.client.query(sql, values);
      return response;
    } catch (error) {
      throw new Error("Error al realizar la consulta: " + error.message);
    }
  }
}

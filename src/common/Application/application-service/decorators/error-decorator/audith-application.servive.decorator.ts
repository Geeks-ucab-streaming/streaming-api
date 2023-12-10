import { json } from "stream/consumers";
import { IApplicationService } from "../../application.service.interface";
import { ApplicationServiceDecorator } from "./application.service.decorator";
import {Client} from 'pg';

export class audith<D,R,JSON> extends ApplicationServiceDecorator<D,R> {

public createjson(data: D): JSON {
    return data as JSON;

  }
//creo el cliente con el que voy a conectarme a la base de datos
  const client = new Client({
    user: 'tuUsuario', 
    host: 'postgresql://geeks_admin:Desarrollo2023@bd-soundspace-desarrollo.postgres.database.azure.com:5432/postgres',
    database: 'postgres',
    password: 'Desarrollo2023',
    port: 5432,
   });

   await Client.connect();

   //creo mi insert
   const sql = 'INSERT INTO audith(audith_json) VALUES($1) RETURNING id';
   const value= [JSON.stringify(this.createjson(data:JSON))];


}
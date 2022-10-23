import {DBMigration, openDB, readFromDB, writeIntoDB} from "../utils";

export const migrations: Array<DBMigration> = [
    (db) => {
        db.createObjectStore('todos', {
            keyPath: 'id',
            autoIncrement: true,
        });
    }
];


export class TodoDB {

}

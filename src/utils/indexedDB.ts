export type DBMigration = (db: IDBDatabase) => void;

export const migrations: Array<DBMigration> = [
    (db) => {
        db.createObjectStore('todos', {
            keyPath: 'id',
            autoIncrement: true,
        });
    }
];

export class IndexedDB {
    openDB(name: string, migrations: DBMigration[]): Promise<IDBDatabase> {
        return  new Promise<IDBDatabase>((resolve, reject) => {
            const request = indexedDB.open(name, migrations.length)

            request.onerror = error => {
                reject(error);
            }

            request.onsuccess = () => {
                resolve(request.result);
            }

            request.onupgradeneeded = (event) => {
                const db = request.result;
                const { oldVersion } = event;
                for (const migration of migrations.slice(oldVersion)) {
                    migration(db);
                }
            }

        })
    }

    writeIntoDB(db: IDBDatabase, storeName: string, data: unknown): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const objectStore = transaction.objectStore(storeName);
            const request = objectStore.put(data);

            request.onerror = error => reject(error);
            request.onsuccess = () => resolve(request.result as number)
        })
    }
    readFromDB(db: IDBDatabase, storeName: string, key: number): Promise<unknown> {
        return  new Promise((resolve, reject) => {
            const  transaction = db.transaction(storeName, 'readonly');
            const objectStore = transaction.objectStore(storeName);
            const request = objectStore.get(key);

            request.onerror = error => reject(error);
            request.onsuccess = () => resolve(request.result);
        })
    }


};



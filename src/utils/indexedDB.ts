export { };


type DBMigration = (db: IDBDatabase) => void;

const migrations: DBMigration[] = [


    (db) => {
        db.createObjectStore('users', {
            keyPath: 'id',
            autoIncrement: true,

        });
    },
];




// 1 самодельная функция создания/открытия БД
export function openDB(name: string, migrations: DBMigration[]): Promise<IDBDatabase> {
    return new Promise<IDBDatabase>((resolve, reject) => {

        const request = indexedDB.open(name, migrations.length);

        request.onerror = (error) => {
            reject(error);
        }

        request.onsuccess = () => {
            resolve(request.result);
        };



        request.onupgradeneeded = (event) => {
            const db = request.result; //получим БД из обьекта


            const oldVersion = event.oldVersion;

            for (const migration of migrations.slice(oldVersion)) {
                migration(db);

            }
        };
    });
}




//2 функция записи в БД к-либо данных
// 3 аргумента: БД, имя хранилища, данные

export function writeIntoDB(db: IDBDatabase, storeName: string, data: unknown): Promise<number> {
    return new Promise((resolve, reject) => {

        const transaction = db.transaction(storeName, 'readwrite');

        const objectStore = transaction.objectStore(storeName);

        const request = objectStore.put(data);

        request.onerror = error => reject(error);
        request.onsuccess = () => {

            resolve(request.result as number);

        }
    });
}





// 3 функция получения данных из БД по ключу
// 3 параметра - БД, имя хранилища, ключ
// вернет промис
export function readfromDB(db: IDBDatabase, storeName: string, key: number): Promise<unknown> {
    return new Promise((resolve, reject) => {

        const transaction = db.transaction(storeName, 'readonly');
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.get(key);


        request.onerror = error => reject(error);
        request.onsuccess = () => resolve(request.result);

    });

}



// 4 функция получения всех записей
// 3 параметра - БД, имя хранилища, ключ
// вернет промис
export function readALLfromDB(db: IDBDatabase, storeName: string): Promise<unknown> {
    return new Promise((resolve, reject) => {

        const transaction = db.transaction(storeName, 'readonly');
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.getAll();


        request.onerror = error => reject(error);
        request.onsuccess = () => resolve(request.result);

    });

}




// 5 функция удалeния из хранилища по ключу обьекта
export function deletefromDB(db: IDBDatabase, storeName: string, key: number): Promise<unknown> {

    return new Promise((resolve, reject) => {
        const request = db.transaction(storeName, 'readwrite').objectStore(storeName).delete(key);

        request.onerror = error => reject(error);
        request.onsuccess = () => resolve(request.result);

    });
}






// 6 функция удалeния из хранилища по id обьекта
export function deletefromDBid(db: IDBDatabase, storeName: string, id: any): Promise<unknown> {

    return new Promise((resolve, reject) => {
        const request = db.transaction(storeName, 'readwrite').objectStore(storeName).delete(id);

        request.onerror = error => reject(error);
        request.onsuccess = () => resolve(request.result);

    });
}




const DBName = 'WGL-DB';
const DBVersion = 1;
let db;

const dbResquest = indexedDB.open(DBName, DBVersion);

dbResquest.onerror = (error) => {
  console.log(error);
};

dbResquest.onsuccess = () => {
  console.log(`Database ${DBName}:${DBVersion} opended successfuly.`);
  db = dbResquest.result;
};

dbResquest.onupgradeneeded = (event) => {
  db = (event.target as any).result;
};

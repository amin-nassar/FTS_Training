import fs from 'fs';

export function readJsonFile(fileName:string) {
  const fileContent:Buffer = fs.readFileSync(fileName);
  const actualData = JSON.parse(fileContent.toString());
  return actualData;
}

export function saveToJsonFile(fileName: string, datatoSave: any) {
  fs.writeFileSync(fileName, JSON.stringify(datatoSave));
}

export function getIndexById<T extends {id: number}>(array: T[], id: number | string) {
  return array.findIndex(e => e.id === Number(id));
}

export function getItemById<T extends {id: number}>(array: T[], id: number | string) {
  return array.find(e => e.id === Number(id));
}
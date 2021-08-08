
export class ObjectManipulator {
  constructor(protected obj: Object) { }

  public set(key: string, value: any): ObjectManipulator {
    return new ObjectManipulator({ ...this.obj, [key]: value });
  }

  public get(key: string): any {
    return this.obj[key];
  }

  public delete(key: string): ObjectManipulator {
    const newObj = { ...this.obj };
    delete newObj[key];
    return new ObjectManipulator(newObj);
  }

  public getObject(): Object { return this.obj }
}

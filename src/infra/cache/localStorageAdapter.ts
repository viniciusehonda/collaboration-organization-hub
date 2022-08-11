import { SetStorage, GetStorage } from '@/data/protocols/cache/localStorage'

export class LocalStorageAdapter implements SetStorage, GetStorage {

  set (key: string, value: object): void {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      localStorage.removeItem(key)
    }
  }

  get (key: string): any {
    let item = localStorage.getItem(key)
    if (item)
    {
        return JSON.parse(item)
    }

    return null;
  }
}
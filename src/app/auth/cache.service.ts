export abstract class CacheService {
  protected setItem(key: string, data: object | string) {
    let stringData = JSON.stringify(data)
    localStorage.setItem(key, stringData)
  }

  protected getItem<T>(key: string): T | null {
    const data = localStorage.getItem(key)
    if (data) {
      return JSON.parse(data)
    }
    return null
  }

  protected removeItem(key: string) {
    localStorage.removeItem(key)
  }
  protected clearStorage() {
    localStorage.clear()
  }
}

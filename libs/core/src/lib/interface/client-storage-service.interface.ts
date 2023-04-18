export interface IClientStorageService {
  /**
   * Set the key-value pair in storage
   * @param key
   * @param value
   */
  set(key: string, value: any): void;

  /**
   * Get the key from storage
   * @param key
   */
  get(key: string): any;

  /**
   * Remove specific key-value from storage
   * @param key
   */
  remove(key: string): void;
}

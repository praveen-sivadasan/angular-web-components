import { Injectable } from '@angular/core';
import { IClientStorageService } from '../../interface/client-storage-service.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements IClientStorageService {
  set(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item ${key} to local storage:`, error);
    }
  }

  get(key: string): any {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting item ${key} from local storage:`, error);
      return null;
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key} from local storage:`, error);
    }
  }
}

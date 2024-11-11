import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Car {
  id: string;
  name: string;
  year: number;
  type: string;
  pricePerDay: number;
  image: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'https://672c1a931600dda5a9f74517.mockapi.io/api/cars/cars';

  constructor(private http: HttpClient) {}

  listAll(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }

  getById(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`);
  }
}


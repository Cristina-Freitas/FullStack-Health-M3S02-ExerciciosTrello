import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../services/car.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.scss'
})
export class CarDetailComponent implements OnInit {

  car: any;
  isFavorite: boolean = false;
  private carService = inject(CarService);
  private route = inject(ActivatedRoute);
  private storageKey: string = 'favorites';


  ngOnInit(): void {
    const carId = this.route.snapshot.paramMap.get('id');
    if (carId) {
      this.carService.getById(carId).subscribe({
        next: (data) => (this.car = data),
        error: (error) => console.error('Erro ao carregar detalhes do carro:', error)
      });
    }
  }

  // Verifica se o carro está nos favoritos
  checkIfFavorite(id: string): boolean {
    const favorites = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    return favorites.some((favorite: any) => favorite.id === id);
  }

  // Adiciona ou remove o carro dos favoritos
  toggleFavorite(): void {
    let favorites = JSON.parse(localStorage.getItem(this.storageKey) || '[]');

    if (this.isFavorite) {
      // Remove dos favoritos
      favorites = favorites.filter((favorite: any) => favorite.id !== this.car.id);
      this.isFavorite = false;
    } else {
      // Adiciona aos favoritos
      favorites.push(this.car);
      this.isFavorite = true;
    }

    // Atualiza o LocalStorage
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }
}



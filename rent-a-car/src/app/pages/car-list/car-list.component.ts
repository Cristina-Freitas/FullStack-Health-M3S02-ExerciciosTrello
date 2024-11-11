import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService } from '../../services/car.service';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
  standalone: true,
  imports: [CardComponent, ReactiveFormsModule, CommonModule],
})
export class CarListComponent implements OnInit {
  carService = inject(CarService);
  router = inject(Router);

  cars: any[] = [];
  searchResults: any[] = [];
  private storageKey = 'favorites';

  carSearch = new FormGroup({
    searchInput: new FormControl('')
  });

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.carService.listAll().subscribe({
      next: (data: any[]) => {
        const favorites = JSON.parse(localStorage.getItem(this.storageKey) || '[]');

        // Marca cada carro como favorito se ele estiver no array de favoritos
        this.cars = data.map(car => ({
          ...car,
          isFavorite: favorites.some((fav: any) => fav.id === car.id)
        }));
      },
      error: (error) => {
        console.error('Erro ao recuperar informações de carros: ', error);
      }
    });
  }

  redirectToDetail(id: string): void {
    this.router.navigate(['car', id]);
  }

  searchCar(): void {
    const searchInput = this.carSearch.value.searchInput?.trim();
    if (searchInput) {
      this.carService.listAll().subscribe((data) => {
        this.cars = data.filter((searchedCar: { name: string; type: string }) => {
          const isNameMatch = searchedCar.name.toLowerCase().includes(searchInput.toLowerCase());
          const isTypeMatch = searchedCar.type.toLowerCase().includes(searchInput.toLowerCase());
          return isNameMatch || isTypeMatch;
        });
  
        if (this.cars.length === 0) {
          alert('Não foram encontrados carros com este modelo ou tipo.');
        }
      });
    } else {
      this.loadCars();
      alert('A lista de carros foi recarregada.');
    }
  }
  

  trackByCarId(index: number, car: any): string {
    return car.id;
  }
}

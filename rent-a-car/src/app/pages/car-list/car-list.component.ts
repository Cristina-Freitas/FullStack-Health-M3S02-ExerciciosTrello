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

  carSearch = new FormGroup({
    searchInput: new FormControl('')
  });

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.carService.listAll().subscribe({
      next: (data: any[]) => {
        this.cars = data;
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
        this.searchResults = data.filter((searchedCar: { name: string; type: string }) => {
          const isNameMatch = searchedCar.name.toLowerCase().includes(searchInput.toLowerCase());
          const isTypeMatch = searchedCar.type.toLowerCase().includes(searchInput.toLowerCase());
          return isNameMatch || isTypeMatch;
        });
        this.searchResults.sort((a, b) => a.name.localeCompare(b.name));
        if (this.searchResults.length === 0) {
          alert('Não foram encontrados carros com este modelo ou tipo.');
        }
        this.cars = this.searchResults;
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

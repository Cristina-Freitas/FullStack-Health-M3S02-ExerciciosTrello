import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [],
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.scss'
})
export class CarDetailComponent implements OnInit {

  car: any;
  private carService = inject(CarService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const carId = this.route.snapshot.paramMap.get('id');
    if (carId) {
      this.carService.getById(carId).subscribe({
        next: (data) => (this.car = data),
        error: (error) => console.error('Erro ao carregar detalhes do carro:', error)
      });
    }
  }

}

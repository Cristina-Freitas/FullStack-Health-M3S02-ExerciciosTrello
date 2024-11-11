import { DatePipe, CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [DatePipe]
})
export class CardComponent {
  @Input() data: any;
  datePipe = inject(DatePipe);

  getYear(dateString: any): string | null {
    // Verifica se o valor é um número e o trata como um ano
    if (typeof dateString === 'number') {
      return dateString.toString();
    }
  
    // Converte para uma data se for uma string no formato ISO
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return this.datePipe.transform(date, 'yyyy');
    }
  
    // Retorna null se o formato não for reconhecido
    return null;
  }
  
}

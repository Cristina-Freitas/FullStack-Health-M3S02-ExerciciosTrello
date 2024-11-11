import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  favoriteCount: number = 0;
  private storageKey: string = 'favorites';

  ngOnInit(): void {
    this.updateFavoriteCount();
  }

  updateFavoriteCount(): void {
    const favorites = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    this.favoriteCount = favorites.length;
  }
}

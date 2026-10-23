import { Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-restaurant-search',
  standalone: true,
  templateUrl: './restaurant-search.component.html',
  styleUrl: './restaurant-search.component.scss'
})

export class RestaurantSearchComponent {

  @Output()
  searchChange = new EventEmitter<string>();

  onSearch(value: string): void {
    this.searchChange.emit(value);
  }

}

import { Component } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'book-library';
  loading: boolean = false;

  constructor(private loadingService: LoadingService) {
    this.loadingService.loading$.subscribe(
      (status: boolean) => {
        this.loading = status;
      }
    );
  }
}

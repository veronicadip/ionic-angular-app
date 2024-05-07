import {Component, inject} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import {MovieService} from "../services/movie.service";
import {InfiniteScrollCustomEvent} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  private movieService = inject(MovieService);
  private currentPage = 1;
  private error = null;
  private isLoading = false;
  private movies = [];
  public imageBaseURL = "https://image.tmdb.org/t/p";

  constructor() {
    this.loadMovies()
  }

  loadMovies(event?: InfiniteScrollCustomEvent) {
    this.error = null;

    if(!event) {
      this.isLoading = true;
    }

    this.movieService.getTopRatedMovies(this.currentPage).pipe().subscribe();
  }

  loadMore(event: InfiniteScrollCustomEvent) {}
}

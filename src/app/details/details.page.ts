import { Component, Input, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonText, IonLabel, IonButtons, IonBackButton, IonItem } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { MovieI } from '../services/interfaces';
import { cashOutline, calendarOutline } from "ionicons/icons"
import { addIcons } from 'ionicons';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonText, IonLabel, IonButtons, IonBackButton, IonItem, CommonModule, FormsModule, DatePipe, CurrencyPipe]
})
export class DetailsPage {
  private movieService = inject(MovieService);
  imageBaseURL = "https://image.tmdb.org/t/p";
  movie: WritableSignal<MovieI | null> = signal(null);

  @Input()
  set id(movieID: string){
    this.movieService.getMovieDetails(movieID).subscribe((movie) => {
      this.movie.set(movie)
    })
  }

  constructor() { 
    addIcons({cashOutline, calendarOutline});
  }

}
 
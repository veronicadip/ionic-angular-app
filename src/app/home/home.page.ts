import {Component, inject} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonAvatar, IonSkeletonText, IonAlert, IonLabel, IonBadge, IonInfiniteScroll, IonInfiniteScrollContent, IonModal, IonButtons, IonCheckbox, IonIcon, IonButton } from '@ionic/angular/standalone';
import {MovieService} from "../services/movie.service";
import {InfiniteScrollCustomEvent} from "@ionic/angular";
import { catchError, finalize } from 'rxjs';
import { MovieResultI } from '../services/interfaces';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { logoFacebook, logoGoogle } from "ionicons/icons"
import { addIcons } from 'ionicons';
import {StorageService} from "../services/storage.service"

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonAvatar, IonSkeletonText, IonAlert, IonLabel, IonBadge, IonInfiniteScroll, IonInfiniteScrollContent, IonModal, IonButtons, IonCheckbox, IonIcon, IonButton, DatePipe, RouterModule],
})
export class HomePage {
  private movieService = inject(MovieService);
  private authService = inject(AuthService);
  private currentPage = 1;
  error = null;
  isLoading = false;
  movies: MovieResultI[] = [];
  imageBaseURL = "https://image.tmdb.org/t/p";
  dummyArray = new Array(8)
  openModal = false;
  dontShowModal = !!sessionStorage.getItem("dontShowLoginModal");
  isChecked = false;

  constructor(private storageService: StorageService) {
    addIcons({logoFacebook, logoGoogle})
    this.loadMovies();
    if(!this.authService.isUserLoggedIn && !this.dontShowModal) {
      this.setModal(true)
    }
  }

  async setValue() {
    await this.storageService.set("example", "hello!")
  }

  setDontShowModal() {
    this.isChecked = !this.isChecked
    if(this.isChecked) {
      sessionStorage.setItem("dontShowLoginModal", "true");
    } else {
      sessionStorage.removeItem("dontShowLoginModal");
    }
  }

  logWithFacebook() {
    this.authService.logWithFacebook()
  }

  logWithGoogle() {
    this.authService.logWithGoogle()
  }

  setModal(bool: boolean) {
    this.openModal = bool;
  }

  getRoundedRating(num: number) {
    return parseFloat(num.toFixed(1))
  }

  loadMovies(event?: InfiniteScrollCustomEvent) {
    this.error = null;

    if(!event) {
      this.isLoading = true;
    }

    this.movieService.getTopRatedMovies(this.currentPage).pipe(
      finalize(() => {
        this.isLoading = false;
        if(event) {
          event.target.complete()
        }
      }),
      catchError((err: any) => {
        console.log(err)
        this.error = err.error.status_message;
        return [];
      })
    ).subscribe({
      next: (res) => {
        this.movies.push(...res.results);
        if(event) {
          event.target.disabled = res.total_pages === this.currentPage;
        }
      }
    });
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(event);
  }
}

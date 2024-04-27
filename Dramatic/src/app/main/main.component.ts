import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  response: any;
  motdID: any;
  theMovieOfTheDay: any;
  genres: any;
  isAdult: any;
  year: any;
  popularMovies: any;
  topRatedMovies: any;
  constructor(private http: HttpClient) {
    
  }
  ngOnInit() {
    this.http.get('https://api.themoviedb.org/3/trending/movie/day?api_key=8ba9b69ccedb28c7793555ad002961d9')
    .subscribe((response) => {
      this.response = response
      this.motdID = this.response.results[0].id
      this.getFilmById(this.motdID)
      this.getPopularMovies()
      this.getTopRatedMovies()
    })
  }

  getFilmById(id: string) {
    this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=8ba9b69ccedb28c7793555ad002961d9`)
    .subscribe((response) => {
      this.theMovieOfTheDay = response
      this.genres = this.theMovieOfTheDay.genres
      this.isAdult = !this.theMovieOfTheDay.adult
      this.year = this.theMovieOfTheDay.release_date.split("-")[0]
    })
  }
  
  getPopularMovies() {
    this.http.get('https://api.themoviedb.org/3/movie/popular?api_key=8ba9b69ccedb28c7793555ad002961d9')
    .subscribe((response : any) => {
      this.popularMovies = response.results
    })
  }

  getTopRatedMovies() {
    this.http.get('https://api.themoviedb.org/3/movie/top_rated?api_key=8ba9b69ccedb28c7793555ad002961d9')
    .subscribe((response : any) => {
      this.topRatedMovies = response.results
    })
  }
}

import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  // paises: any;
  nuevasCanciones: any[] = [];
  loading: boolean;
  // private http: HttpClient esto va dentro del constructor
  constructor(private spotify: SpotifyService) {

    // Ejemplo de peticion http simple sin token
    // console.log('Constructor del Home hecho');
    // this.http.get('https://restcountries.eu/rest/v2/lang/es')
    //     .subscribe( (x: any ) => {
    //       this.paises = x;
    //       console.log(x);
    //     });

    this.loading = true;

    // Asi llamamos al metodo desde service para conseguir todo los nuevos albunes
     this.spotify.getNewReleases()
       .subscribe((data: any) => {
        this.nuevasCanciones = data;
        this.loading = false;
       });
   }

  ngOnInit(): void {
  }

}

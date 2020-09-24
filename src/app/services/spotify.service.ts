import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Spotify Service Listo');
   }
  
   getQuery(query: string){

    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      // Para conseguir el token usar postman
      'Authorization': 'Bearer '
    });
    return this.http.get(url, {headers});
   }

  getNewReleases(){

    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer '
    // });

    return this.getQuery('browse/new-releases?limit=20')
          .pipe(map (data => {
            return data['albums'].items;
          }));
    
    // this.http.get('https://api.spotify.com/v1/browse/new-releases?limit=20', { headers })
    //           .pipe(map (data => {
    //             return data['albums'].items;
    //           }));
     
  }

  getArtistas(termino: string){

    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer '
    // });

    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
          .pipe(map (data => data['artists'].items));

    // return this.http.get(`https://api.spotify.com/v1/search?q=${termino}&type=artist&limit=15`, { headers })
    //           .pipe(map (data => data['artists'].items));
  }

  getArtista(id: string){
    return this.getQuery(`artists/${id}`);
    // .pipe(map (data => data['artists'].items));
  }

  getTopTracks(id: string){
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
    .pipe(map (data => data['tracks']));
  }
}

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
      'Authorization': 'Bearer BQANNvZR4S_8zaEEGO2BZ2kU6jWXRX5QVkOlP0XxgSkyWGXbKJZnxRaP8gtqDz4yhwR4cottJhzvP3N6nVs'
    });
    return this.http.get(url, {headers});
   }

  getNewReleases(){

    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQCOAfKL3ASL5-chagj2e2DiOV7lS6_lbAIsg8z5quFNg-2W-tqAwo1MrvbNVK6CYvAFOIn60rpzjts1HfY'
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
    //   'Authorization': 'Bearer BQCOAfKL3ASL5-chagj2e2DiOV7lS6_lbAIsg8z5quFNg-2W-tqAwo1MrvbNVK6CYvAFOIn60rpzjts1HfY'
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
}
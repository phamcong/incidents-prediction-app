import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  constructor( private http: HttpClient ) { }

  getModels(): any {
    return this.http.get('http://localhost:8080/api/predictionmodels')
    .pipe(map(res => res ));
  }
}

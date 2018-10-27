import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ModelsService {
  constructor( private http: HttpClient ) { }

  getModels(): any {
    return this.http.get('http://localhost:8080/api/predictionmodels')
    .pipe(map(res => res ));
  }

  getInputParameters(vsystem, vappsystem): any {
    console.log('vsystem: ', vsystem);
    console.log('vappsystem: ', vappsystem);
    return this.http.post('http://localhost:8080/api/getinputparameters/', {'vsystem': vsystem, 'vappsystem': vappsystem}, httpOptions)
    .pipe(map(res => res));
  }

  callPredictionModel(modelID, parameters): any {
    return this.http.post('http://localhost:8080/api/predictionmodels/' + modelID + '/', {'parameters': parameters}, httpOptions)
    .pipe(map(res => res));
  }

  callModel(parameters): any {
    return this.http.post('http://localhost:8080/api/callpredictionmodel/', {'parameters': parameters}, httpOptions)
    .pipe(map(res => res));
  }

  getSystems(): any {
    return this.http.get('http://localhost:8080/api/systemsinfo')
    .pipe(map(res => res ));
  }
}


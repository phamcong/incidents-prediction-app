import { Component, OnInit } from '@angular/core';
import * as demoData from '../../shared/demo-data';
import { Model } from 'src/app/shared/models/model';
import { ModelsService } from 'src/app/services/models.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})


export class ModelsComponent implements OnInit {
  public models$: Observable<any>;
  public models: Model[];
  public selectedModel: Model;

  constructor( private ms: ModelsService ) { }

  ngOnInit() {
    this.models$ = this.ms.getModels()
      .subscribe(data => {
        this.models = data.models;
        console.log(this.models);
      });
  }

  changeModel($event) {
    this.selectedModel = $event.target.value;
    console.log('selected model: ', this.selectedModel);
  }
}

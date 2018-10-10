import { Component, OnInit } from '@angular/core';
import * as demoData from '../../shared/demo-data';
import { Model } from 'src/app/shared/models/model';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})


export class ModelsComponent implements OnInit {
  public models: Model[];
  public selectedModel: Model;

  constructor() { }

  ngOnInit() {
    this.models = [demoData.bayesnetwork];
    console.log(this.models);
  }

  changeModel($event) {
    this.selectedModel = $event.target.value;
    console.log('selected model: ', this.selectedModel);
  }
}

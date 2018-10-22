import { Component, OnInit } from '@angular/core';
import * as demoData from '../../shared/demo-data';
import { Model } from 'src/app/shared/models/model';
import { ModelsService } from 'src/app/services/models.service';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})


export class ModelsComponent implements OnInit {
  public models$: Observable<any>;
  public calledModel$: Observable<any>;
  public models: Model[];
  public selectedModel: Model;
  public resultImageBase64Path: string;

  constructor( private ms: ModelsService, private _sanitizer: DomSanitizer) { }

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

  callPredictionModel() {
    const selectedParameters = {};
    this.selectedModel.parameters.map(parameter => {
      if (parameter['selectedValue'] !== undefined) {
        const selectedValue = parameter['selectedValue'];
        selectedParameters[parameter['label']] = selectedValue['type_value'] === 'number' ? +selectedValue['value'] : selectedValue['value']
      }
    });

    this.calledModel$ = this.ms.callPredictionModel(this.selectedModel['id'], selectedParameters)
    .subscribe(data => {
      this.resultImageBase64Path = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + data['result']);
      console.log('resultImageBase64Path: ', this.resultImageBase64Path);
    });
  }
}

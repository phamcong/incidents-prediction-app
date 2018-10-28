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
  public systemsInfo$: Observable<any>;
  public calledModel$: Observable<any>;
  public inputParameters$: Observable<any>;
  public inputParameters: any[];
  public models: Model[];
  public systems: any[];
  public selectedModel: Model;
  public selectedSystem: any;
  public selectedVsystem: any;
  public selectedAppsystem: any;
  public selectedVappsystem: any;
  public resultImageBase64Path: any;
  public resultCSV: string[];
  public headerCSV: string[];
  public linesCSV: any[];

  constructor( private ms: ModelsService, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.systemsInfo$ = this.ms.getSystems()
    .subscribe(data => {
      this.systems = data['systems_info']['systems'];
      console.log(this.systems);
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
      console.log(data);
      this.resultImageBase64Path = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + data['resultImageBase64']);
      this.resultCSV = data['resultCSV'];
      this.headerCSV = this.resultCSV['0'].split(', ');
      const lines = this.resultCSV.slice(1);
      this.linesCSV = lines.map(line => line.split(', '));
    });
  }

  callModel() {
    const ipParameter = {}
    this.inputParameters.map(parameter => {
      if (parameter['checked']) {
        const value = parameter['value'];
        ipParameter[parameter['label']] = parameter['type_value'] === 'number' ? +value : value;
      }
    });
    this.calledModel$ = this.ms.callModel(ipParameter)
    .subscribe(data => {
      console.log(data);
      this.resultCSV = data['resultCSV'];
      this.headerCSV = this.resultCSV['0'].split(', ');
      const lines = this.resultCSV.slice(1);
      this.linesCSV = lines.map(line => line.split(', '));
    });
  }

  getInputParameters(): any {
    this.inputParameters$ = this.ms.getInputParameters(this.selectedVsystem, this.selectedVappsystem)
    .subscribe(data => {
      this.inputParameters = data['input_parameters'];
    });
  }
}

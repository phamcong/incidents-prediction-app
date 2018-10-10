import { Parameter } from "./models/parameter";
import { Model } from "./models/model";

var commitNumber = new Parameter('Commit Number', ['Low', 'Medium', 'High'])
var numberOfDeveloper = new Parameter('Number Of Developer', ['Low', 'Medium', 'High'])
var buildFailures = new Parameter('Build Failures', [0, 1])
var numberOfFixedBug = new Parameter('Number Of Fixed Bug', [0, 1])
var categoryOfIncident = new Parameter('Category Of Incident', ['Low', 'Medium', 'High'])

export var bayesnetwork = new Model('Bayesian Network', [commitNumber, numberOfDeveloper, buildFailures, numberOfFixedBug, categoryOfIncident])
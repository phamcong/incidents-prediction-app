import { Parameter } from "./parameter";
import { Deserializable } from "./deserializable";

export class Model implements Deserializable {
    name: string;
    parameters: Parameter[];

    deserialize(input: any): this {
        Object.assign(this, input);
        this.parameters.map(parameter => { new Parameter(parameter.name, parameter.values).deserialize(parameter) })
        return this;
    }

    constructor (name: string, parameters: Parameter[]) {
        this.name = name;
        this.parameters = parameters;
    }
}

import { Deserializable } from "./deserializable";

export class Parameter implements Deserializable {
    name: string;
    values: any[];

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    constructor(name: string, values: any[]) {
        this.name = name;
        this.values = values;
    }
}

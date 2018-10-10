// deserialize our JSON to our objects. 
// interface which provides an API for deserialization
export interface Deserializable {
    deserialize(input: any): this;
}
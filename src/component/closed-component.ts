import { BaseComponent } from "./base-component";
import { Component } from "./types";

export class ClosedComponent extends BaseComponent{

    constructor(
        key: string,
        components?: Component[],
        properties?: {[p: string]: string},
        css?: {[p: string]: string}
    ) {
        super(key, components, false, properties, css)
    }
}
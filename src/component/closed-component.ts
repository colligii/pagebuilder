import { CustomFunction } from "../util/custom-function.type";
import { BaseComponent } from "./base-component";
import { Component } from "./types";

export class ClosedComponent extends BaseComponent{

    constructor(
        key: string,
        components?: Component[],
        properties?: {[p: string]: string},
        css?: {[p: string]: string},
        events?: {[p: string]: CustomFunction}
    ) {
        super(key, components, false, properties, css, undefined, events)
    }
}
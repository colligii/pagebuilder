import { BaseComponent } from "./base-component";
import { Component } from "./types";

export class ClosedComponent extends BaseComponent {

    constructor(
        props: ClosedComponentInput
    ) {
        super(props)
    }
}

export interface ClosedComponentInput {
    key: string,
    components?: Component[],
    properties?: { [p: string]: string },
    css?: { [p: string]: string },
    events?: { [p: string]: Function }
}
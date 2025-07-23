import { BaseComponent } from "./base-component";

export class SelfClosedComponent extends BaseComponent {

    constructor(
        key: string,
        properties: {[p: string]: string},
        css: {[p: string]: string},
    ) {
        super(key, undefined, false, properties, css);
    }
}
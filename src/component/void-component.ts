import { BaseComponent } from "./base-component";

export class VoidComponent extends BaseComponent {

    constructor(
        key: string,
        properties?: {[p: string]: string},
        css?: {[p: string]: string},
    ) {
        super(key, undefined, true, properties, css);
    }
}
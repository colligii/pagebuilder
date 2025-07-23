import { BaseComponent } from "./base-component";

export class TextComponent extends BaseComponent {
    
    constructor(
        key: string,
        text: string,
        properties?: {[p: string]: string},
        css?: {[p: string]: string},
    ) {
        super(key, undefined, false, properties, css, text)
    }
}
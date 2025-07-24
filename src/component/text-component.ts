import { CustomFunction } from "../util/custom-function.type";
import { CustomString } from "../util/custom-string.type";
import { BaseComponent } from "./base-component";

export class TextComponent extends BaseComponent {
    
    constructor(
        key: string,
        text: CustomString,
        properties?: {[p: string]: string},
        css?: {[p: string]: string},
        events?: {[p: string]: CustomFunction}
    ) {
        super(key, undefined, false, properties, css, text, events)
    }
}
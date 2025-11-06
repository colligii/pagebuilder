import { CustomString } from "../util/custom-string.type";
import { BaseComponent } from "./base-component";

export class TextComponent extends BaseComponent {
    
    constructor(
        props: TextComponentInput
    ) {
        super(props);
    }
}

export interface TextComponentInput {
    key: string,
    text: CustomString,
    events?: { [p: string]: Function },
    properties?: {[p: string]: string},
    css?: {[p: string]: string},
}
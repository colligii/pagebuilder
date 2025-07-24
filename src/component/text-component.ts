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
    key: 'span' | 'title' | 'style',
    text: CustomString,
    properties?: {[p: string]: string},
    css?: {[p: string]: string},
}
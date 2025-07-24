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
    text: string,
    properties?: {[p: string]: string},
    css?: {[p: string]: string},
}
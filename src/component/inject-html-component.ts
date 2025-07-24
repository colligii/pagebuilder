import { BaseComponent } from "./base-component";

export class InjectHtmlComponent extends BaseComponent {
    constructor(
        props: InjectHTMLComponentInput
    ) {
        super({
            ...props,
            text: props.html
        })
    }
}

export interface InjectHTMLComponentInput {
    key: string,
    properties?: {[p: string]: string},
    css?: {[p: string]: string},
    html?: string,
}
import { BaseComponent } from "./base-component";

export class ImgComponent extends BaseComponent {

    constructor(
        props: ImgComponentInput
    ) {
        super({
            ...props,
            key: 'img'
        });
    }
}

export interface ImgComponentInput {
    properties: {
        alt: string;
        src: string;
        [p: string]: string
    },
    css: { [p: string]: string },
}
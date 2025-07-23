import { BaseComponent } from "./base-component";

export class ImgComponent extends BaseComponent {

    constructor(
        properties: {
            alt: string;
            src: string;
            [p: string]: string
        },
        css: {[p: string]: string},
    ) {
        super('img', undefined, false, properties, css);
    }
}
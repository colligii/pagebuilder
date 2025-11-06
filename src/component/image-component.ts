import { Build } from "../build/build";
import { PublicPath } from "../public-script/public";
import { Queue } from "../queue";
import { BaseComponent } from "./base-component";
import { BaseComponentInterface } from "./base-component.interface";
import { VoidComponent } from "./void-component";
import sharp from "sharp";

export class ImageComponent implements BaseComponentInterface {

    constructor(
        private input: ImageComponentInput
    ) {

    }

    build() {
        const fileName = this.input.originalMediaPath.split('.')[0];
        const inSrcFile = PublicPath.fileAddress(this.input.originalMediaPath);

        const sharpRequest = sharp(inSrcFile)
            .webp({ quality: this.input.quality ?? 100 })

        if(this.input.width)
            sharpRequest
                .resize(this.input.width)

        Queue.registerPromise(sharpRequest
            .toFile(PublicPath.outFileAddress(`${fileName}.webp`))
        );

        if (!this.input?.breakpoints?.length)
            return new VoidComponent({
                key: 'img',
                css: this.input.imgCss,
                properties: {
                    alt: this.input.alt,
                    src: `/public/${fileName}.webp`,
                    width: `${(this.input.width)}px`,
                    ...(this.input.properties ?? {})
                }
            }).build();

        return new BaseComponent({
            key: 'picture',
            css: this.input.css,
            components: [
                ...this.input.breakpoints.map(breakpoint => {
                    const inSrcFile = PublicPath.fileAddress(breakpoint.srcset);
                    const fileName = this.input.originalMediaPath.split('.')[0] + breakpoint.maxWidth;

                    Queue.registerPromise(sharp(inSrcFile)
                        .webp({ quality: breakpoint.quality ?? 100 })
                        .resize(breakpoint.maxWidth)
                        .toFile(PublicPath.outFileAddress(`${fileName}.webp`)))

                    return new VoidComponent({
                        key: 'source',
                        properties: {
                            media: `(max-width: ${breakpoint.breakpointWidth ?? breakpoint.maxWidth}px)`,
                            srcset: `/public/${fileName}.webp`
                        }
                    })
                }),
                new VoidComponent({
                    key: 'img',
                    css: this.input.imgCss,
                    properties: {
                        alt: this.input.alt,
                        src: `/public/${fileName}.webp`
                    }
                })
            ]
        }).build()
    }

}

export interface ImageComponentInput {
    css?: {[p: string]: string}
    imgCss?: {[p: string]: string}
    originalMediaPath: string
    width?: number
    alt: string
    quality?: number;
    properties?: { [p: string]: string }
    breakpoints?: SourceMedia[]
}

export interface SourceMedia {
    maxWidth: number,
    breakpointWidth?: number,
    srcset: string,
    quality?: number;
}
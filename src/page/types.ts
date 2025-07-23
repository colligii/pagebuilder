export type Component = ImgComponent | SelfClosedComponent | BaseComponent | ClosedComponents;

interface BaseComponent {
    selfClosed?: boolean;
    key: string
    css?: {[p: string]: string}
    properties: {[p: string]: string}
}

interface SelfClosedComponent extends BaseComponent {
    selfClosed: true;
}

interface ImgComponent extends BaseComponent {
    key: 'img',
    properties: {
        src: string,
        alt: string,
    }
}

export interface ClosedComponents extends BaseComponent {
    selfClosed?: boolean;
    childs: Component[]
}
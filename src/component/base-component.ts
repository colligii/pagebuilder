import { Css } from "../css";
import { HTMLHelper } from "../htmlHelper";
import { Component } from "./types";

export class BaseComponent {

    constructor(
        private props: BaseComponentInput
    ) {

    }

    build() {
        const properties = this.props.properties ?? {};
        const { css, key, components, text } = this.props;
        let voidElement = false;
        
        if (css) {
            const styles = Object.entries(css);
            const tempClass = styles.map(([key, value]) => Css.register(key, value)).join(' ');
            properties.class = `${properties.class ? ' ' : ''}${tempClass}`
        }

        const tags = Object.entries(properties ?? {})
            .map(props => (`${props[0]}="${props[1]}"`))
        const renderTag = tags?.length ? ' ' + tags.join(' ') : '';

        if (HTMLHelper.isVoidElement(key)) {
            voidElement = true;
        }

        if (voidElement) {
            return `<${key}${renderTag}>`
        }

        if (components?.length) {
            return `<${key}${renderTag}>
    ${(components ?? []).map((component: any) => component.build()).join('')}            
</${key}>`
        }


        if (text) {
            return `<${key}${renderTag}>${text}</${key}>`
        }
    }

}

export interface BaseComponentInput {
    key: string,
    components?: Component[],
    voidElement?: boolean,
    properties?: { [p: string]: string },
    css?: { [p: string]: string },
    text?: string,
}
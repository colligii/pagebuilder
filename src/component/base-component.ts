import { Css } from "../css";
import { HTMLHelper } from "../htmlHelper";
import { Component } from "./types";

export class BaseComponent {

    constructor(
        private key: string,
        private components?: Component[],
        private voidElement?: boolean,
        private properties?: {[p: string]: string},
        private css?: {[p: string]: string},
        private text?: string,
    ) {

    }

    build() {
        this.properties = this.properties ?? {};
                    
            if(this.css) {
                const styles = Object.entries(this.css);
                const tempClass = styles.map(([key, value]) => Css.register(key, value)).join(' ');
                this.properties.class = `${this.properties?.class ? ' ' : ''}${tempClass}`
            }

            const tags = Object.entries(this.properties ?? {})
                .map(props => (`${props[0]}="${props[1]}"`))
            const renderTag = tags?.length ? ' '+tags.join(' ') : '';

            if(HTMLHelper.isVoidElement(this.key)) {
                this.voidElement = true;
            }

            

            if(this.voidElement) {
                return `<${this.key}${renderTag}>`
            }

            if(this.components?.length) {
                return `<${this.key}${renderTag}>
    ${(this?.components ?? []).map((component: any) => component.build()).join('')}            
</${this.key}>`
            }


            if(this.text) {
                return `<${this.key}${renderTag}>${this.text}</${this.key}>` 
            }
    }

}
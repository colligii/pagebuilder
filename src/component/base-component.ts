import { HTMLHelper } from "../htmlHelper";
import { Component } from "./types";

export class BaseComponent {

    constructor(
        private key: string,
        private components?: Component[],
        private selfClosed?: boolean,
        private properties?: {[p: string]: string},
        private css?: {[p: string]: string},
        private text?: string,
    ) {

    }

    build() {
            const tags = Object.entries(this.properties ?? {})
                .map(props => (`${props[0]}="${props[1]}"`))
            const renderTag = tags?.length ? ' '+tags.join(' ') : '';

            if(HTMLHelper.isSelfClosed(this.key)) {
                this.selfClosed = true;
            }
            
            if(this.selfClosed) {
                return `<${this.key}${renderTag}/>`
            }

            if(this.components?.length) {
                return `<${this.key}${renderTag}>
    ${(this?.components ?? []).map((component: any) => component.build())}            
</${this.key}>`
            }

            if(this.text) {
                return `<${this.key}>${this.text}</${this.key}>` 
            }
    }

}
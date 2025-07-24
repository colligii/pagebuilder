import { randomUUID } from "crypto";
import { Css } from "../css";
import { HTMLHelper } from "../htmlHelper";
import { Component } from "./types";
import { Script } from "../script";
import { CustomString } from "../util/custom-string.type";
import { State } from "../script/state";

export class BaseComponent {

    private selectorVar?: string;

    constructor(
        private props: BaseComponentInput
    ) {

    }

    private generateRid() {
        this.props.properties = this.props.properties ?? {};
        this.props.properties.rid = randomUUID();
        if(!this.selectorVar) {
            this.selectorVar = `elem${this.props.properties.rid.replace(/\-/ig, '')}Sel`;
            Script.register(`const ${this.selectorVar} = document.querySelector('[rid="${this.props.properties.rid}"]')`);
        }
    }

    private buildCustomText(customText: CustomString, method?: string): string {
        if(customText instanceof State) {
            this.generateRid();
            if(method) {
                customText.addReactiveJs(this.selectorVar+'.'+method);
            }
            return customText.getValue() as string;
        }

        return customText;
    }

    build() {
        this.props.properties = this.props.properties ?? {};
        const properties = this.props.properties;
        let { css, key, components, text, events } = this.props ?? {};
        const eventsArr = Object.entries(events ?? {})
        let voidElement = this.props.voidElement ?? false;

        if(text) {
            text = this.buildCustomText(text, 'textContent');
        }

        if(eventsArr?.length) {
            this.generateRid();
            eventsArr.forEach(([eventName, eventFn]) => {
                Script.register(`${this.selectorVar}.addEventListener('${eventName}', ${eventFn.toString()})`)
            })
        }

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
    text?: CustomString,
    events?: { [p: string]: Function }
}
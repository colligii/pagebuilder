import { randomUUID } from "crypto";
import { Css } from "../css";
import { HTMLHelper } from "../htmlHelper";
import { Script } from "../script";
import { Component } from "./types";
import { CustomString } from "../util/custom-string.type";
import { CustomFunction } from "../util/custom-function.type";
import { RenderState, State } from "../script/state";

export class BaseComponent {

    constructor(
        private key: string,
        private components?: Component[],
        private voidElement?: boolean,
        private properties?: { [p: string]: string },
        private css?: { [p: string]: string },
        private text?: CustomString,
        private events?: { [p: string]: CustomFunction },
    ) {

    }

    build() {
        this.properties = this.properties ?? {};
        let endText = this.text;
        let jsLine: any = [];
        let varName: string;
        if(endText instanceof State) {
            this.properties.rid = randomUUID();
            varName = 'rid'+this.properties.rid.replace(/\-/ig, '')+'Sel';
            endText.addWhenChange(() => {
                rid.textContent = gstate;
            }, 'rid'+this.properties.rid.replace(/\-/ig, '')+'Sel')
            endText = endText.getValue();
            jsLine.push(`const ${varName} = document.querySelector('[rid="${this.properties.rid}"]')`);
            console.log(jsLine)
        }
        // const endText = typeof this.text === 'string' ? this.text : this.text?.getValue();
        
        const eventsArr = Object.entries(this.events ?? {});

        if (eventsArr.length) {
            if(!this.properties.rid) {

                this.properties.rid = this.properties?.rid ??  randomUUID();
                varName = 'rid'+this.properties.rid.replace(/\-/ig, '')+'Sel';
                jsLine.push(`const ${varName} = document.querySelector('[rid="${this.properties.rid}"]')`);
            
            }


            jsLine = [
                ...jsLine, 
                ...eventsArr.map(([eventName, eventFn]) => {
                    let endFunction = eventFn.toString();
                    
                    if(eventFn instanceof RenderState) {
                        endFunction = eventFn.getCorrectFunction();
                    }

                    return `${varName}.addEventListener('${eventName}', ${endFunction})`
                })
            ].join('\n')


        }

        if(jsLine.length) {

            console.log(jsLine)

            Script.register(jsLine);
        }

        if (this.css) {
            const styles = Object.entries(this.css);
            const tempClass = styles.map(([key, value]) => Css.register(key, value)).join(' ');
            this.properties.class = `${this.properties?.class ? ' ' : ''}${tempClass}`
        }

        const tags = Object.entries(this.properties ?? {})
            .map(props => (`${props[0]}="${props[1]}"`))
        const renderTag = tags?.length ? ' ' + tags.join(' ') : '';

        if (HTMLHelper.isVoidElement(this.key)) {
            this.voidElement = true;
        }



        if (this.voidElement) {
            return `<${this.key}${renderTag}>`
        }

        if (this.components?.length) {
            return `<${this.key}${renderTag}>
    ${(this?.components ?? []).map((component: any) => component.build()).join('')}            
</${this.key}>`
        }


        if (endText) {
            return `<${this.key}${renderTag}>${endText}</${this.key}>`
        }
    }

}
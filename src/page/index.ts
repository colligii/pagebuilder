import { HTMLHelper } from "../htmlHelper";
import { Component } from "../component/types";
import { ClosedComponent } from "../component/closed-component";
import { TextComponent } from "../component/text-component";
import { VoidComponent } from "../component/void-component";
import { Css } from "../css";
import { InjectHtmlComponent } from "../component/inject-html-component";
import { Script } from "../script";
import { StateScript } from "../script/state-script";

export class Page {

    constructor(
        private title: string,
        private lang: string,
        private component: Component[]
    ) {}

    buildBody() {
        return [
            ...this.component,
        ].map(component => component.build()).join('\n');
    }

    buildScript() {
        return new InjectHtmlComponent({
            key: 'script',
            html: this.mixScript()
        }).build()
    }

    mixScript() {
        return Script.scriptJS + '\n' + StateScript.scriptJs
    }

    preHTML() {
        const htmlContent = this.buildBody();
        const scriptContent = this.buildScript();

        const endBody = htmlContent + '\n' + scriptContent;

        return new ClosedComponent({
            key: 'html',
            properties: {
                lang: this.lang
            },
            components: [
                new ClosedComponent({
                    key: 'head',
                    components: [
                        new VoidComponent({
                            key: 'meta',
                            properties: {
                                charset: 'UTF-8'
                            }
                        }),
                        new VoidComponent({
                            key: 'meta',
                            properties: {
                                name: 'viewport',
                                content: 'width=device-width, initial-scale=1.0'
                            }
                        }),
                        ...Css.component,
                        new TextComponent({
                            key: 'title',
                            text: this.title
                        })
                    ]
                }),
                new InjectHtmlComponent({
                    key: 'body',
                    html: endBody
                })
            ]
        })
        
    }

    build(): string {
        console.log(`start rendering ${this.title}`)
        
        return this.preHTML().build() as string
    }

}

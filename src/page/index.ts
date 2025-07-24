import { HTMLHelper } from "../htmlHelper";
import { Component } from "../component/types";
import { ClosedComponent } from "../component/closed-component";
import { TextComponent } from "../component/text-component";
import { VoidComponent } from "../component/void-component";
import { Css } from "../css";
import { InjectHtmlComponent } from "../component/inject-html-component";

export class Page {

    constructor(
        private title: string,
        private lang: string,
        private component: Component[]
    ) {}

    preHTML(buildedComponent: string) {
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
                    html: buildedComponent
                })
            ]
        })
        
    }

    build(): string {
        console.log(`start rendering ${this.title}`)
        
        return this.preHTML(this.component.map(component => component.build()).join('\n')).build() as string
    }

}

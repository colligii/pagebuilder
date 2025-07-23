import { HTMLHelper } from "../htmlHelper";
import { Component } from "../component/types";
import { ClosedComponent } from "../component/closed-component";
import { TextComponent } from "../component/text-component";
import { VoidComponent } from "../component/void-component";
import { Css } from "../css";

export class Page {

    constructor(
        private title: string,
        private lang: string,
        private component: Component[]
    ) {}

    preHTML(buildedComponent: string) {
        return new ClosedComponent('html', [
            new ClosedComponent('head', [
                new VoidComponent('meta', {
                    charset: 'UTF-8'
                }),
                new VoidComponent('meta', {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1.0'
                }),
                ...Css.component,
                new TextComponent('title', this.title)
            ]),
            new TextComponent('body', buildedComponent)
        ], {
            lang: this.lang
        })
    }

    build(): string {
        console.log(`start rendering ${this.title}`)
        
        return this.preHTML(this.component.map(component => component.build()).join('\n')).build() as string
    }

}

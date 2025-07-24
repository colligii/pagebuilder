import { HTMLHelper } from "../htmlHelper";
import { Component } from "../component/types";
import { ClosedComponent } from "../component/closed-component";
import { TextComponent } from "../component/text-component";
import { VoidComponent } from "../component/void-component";
import { Css } from "../css";
import { Script } from "../script";
import { StateScript } from "../script/StateScript";

export class Page {

    constructor(
        private title: string,
        private lang: string,
        private component: Component[]
    ) {}

    preHTML() {
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
            new TextComponent('body', 
                this.component.map(component => component.build()).join('\n') + Script.component.map(component => component.build()).join('\n') + new TextComponent('script', StateScript.component).build()
            ),
        ], {
            lang: this.lang
        })
    }

    build(): string {
        console.log(`start rendering ${this.title}`)
        
        return this.preHTML().build() as string
    }

}

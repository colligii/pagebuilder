import { HTMLHelper } from "../htmlHelper";
import { Component } from "../component/types";

export class Page {

    constructor(
        private title: string,
        private component: Component[]
    ) {}

    preHTML(html: string) {

        console.log(`finished rendering ${this.title}`);
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.title}</title>
</head>
<body>
    ${html}
</body>
</html>
`
    }

    build() {
        console.log(`start rendering ${this.title}`)
        
        const html = this.component.map(component => component.build()).join('\n');

        return this.preHTML(html)
    }

}

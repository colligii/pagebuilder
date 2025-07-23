import { HTMLHelper } from "../htmlHelper";
import { ClosedComponents, Component } from "./types";

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
        const html = this.component.map(component => {
            
            const tags = Object.entries(component.properties)
                .map(props => (`${props[0]}="${props[1]}"`))
            const renderTag = tags?.length ? ' '+tags.join(' ') : '';

            if(HTMLHelper.isSelfClosed(component.key)) {
                component.selfClosed = true;
            }
            
            if(component.selfClosed) {
                return `<${component.key}${renderTag}/>`
            }

            const tempComponent = component as ClosedComponents;

            return `<${component.key}${renderTag}>
    ${(tempComponent?.childs ?? []).map((_) => 'oi')}            
</${component.key}>`
        }).join(' ')

        return this.preHTML(html)
    }

}

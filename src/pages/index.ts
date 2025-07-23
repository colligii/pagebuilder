import { ClosedComponent } from "../component/closed-component";
import { TextComponent } from "../component/text-component";
import { Page } from "../page";

const page = new Page(
    'main-page',
    'pt-br',
    [
        new ClosedComponent('div', [
            new ClosedComponent('div', [
                new TextComponent('span', 'Oudri kandra larrai')
            ])
        ], {}, {
            background: 'red'
        }),
        new TextComponent('span', 'Oi', undefined, {
            background: 'red'
        }),
        new TextComponent('span', 'Oi', undefined, {
            background: 'purple'
        })
    ]
);

export default page;
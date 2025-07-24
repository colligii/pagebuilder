import { ClosedComponent } from "../component/closed-component";
import { TextComponent } from "../component/text-component";
import { Page } from "../page";
import { State } from "../script/state";

const state = new State('oiii');

const page = new Page(
    'main-page',
    'pt-br',
    [
        new ClosedComponent('div', [
            new ClosedComponent('div', [
                new TextComponent('span', state)
            ])
        ], {}, {
            background: 'red'
        }, {
            click: state.generateFunction(() => {
                gstate = 'Helllloooooo';
            })
        }),
        new TextComponent('span', state, undefined, {
            background: 'red'
        }, {
            'mouseover': state.generateFunction(() => {
                gstate = 'Ok'
            })
        }),
        new TextComponent('span', 'Oi', undefined, {
            background: 'purple'
        })
    ]
);

export default page;
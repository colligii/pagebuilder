import { ClosedComponent } from "../component/closed-component";
import { TextComponent } from "../component/text-component";
import { Page } from "../page";

const home = new Page(
    'home',
    'pt-br',
    [
        new ClosedComponent({
            key: 'div',
            css: {
                background: '#353535',
                display: 'flex',
                'align-items': 'center',
                'flex-direction': 'column',
                'height': '300px'
            },
            components: [
                new TextComponent({
                    key: 'span',
                    text: 'ok',
                    css: {
                        'color': 'white'
                    }
                })
            ]
        })
    ]
)

export default home;
import { ClosedComponent } from "../component/closed-component";
import { TextComponent } from "../component/text-component";
import { Page } from "../page";

const page = new Page(
    'main-page',
    'pt-br',
    [
        new ClosedComponent({
            key: 'div',
            components: [
                new ClosedComponent({
                    key: 'div',
                    components: [
                        new TextComponent({
                            key: 'span',
                            text: 'Oudri kandra larrai'
                        })
                    ]
                })
            ],
            css: {
                background: 'red'
            }
        }),
        new TextComponent({
            key: 'span',
            text: 'Oiiiii'
        }),
        new TextComponent({
            key: 'span',
            text: 'Oiiiii'
        })
    ]
);

export default page;
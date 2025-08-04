import { ClosedComponent } from "../component/closed-component";
import { ImageComponent } from "../component/image-component";
// import { ImgComponent } from "../component/img-component";
import { TextComponent } from "../component/text-component";
import { Page } from "../page";
import registerCustomScript, { registerSetInterval } from "../script";
import { State } from "../script/state";

const state = new State(1)

registerSetInterval(() => {
    gstate[0] = gstate[0] + 1;
}, 1000, [state])

const page = new Page(
    'main-page',
    'pt-br',
    [
        new ImageComponent({
            alt: 'Teste',
            originalMediaPath: 'tolate.jpg',
            breakpoints: [
                {maxWidth: 500,srcset: 'images.jpeg'}
            ]
        }),
        new ClosedComponent({
            key: 'div',
            components: [
                new ClosedComponent({
                    key: 'div',
                    components: [
                        new TextComponent({
                            key: 'span',
                            text: state
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
            text: state
        })
    ]
);

export default page;
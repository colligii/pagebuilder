import { ClosedComponent } from "../component/closed-component";
import { ImageComponent } from "../component/image-component";
// import { ImgComponent } from "../component/img-component";
import { TextComponent } from "../component/text-component";
import { Page } from "../page";
import registerCustomScript from "../script";
import { State } from "../script/state";

registerCustomScript(() => {
    console.log('Boa tarde pessoal')
})

const state = new State('Oudri kandra larrai')

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
            events: {
                'mouseover': state.generateScript(() => {
                    gstate[0] = 'Ok';
                })
            },
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
            text: 'Oiiiii'
        })
    ]
);

export default page;
import { BaseComponent } from "./base-component";

export default function frame(reverse: boolean, ...componenents: any) {
    return new BaseComponent({
        key: 'div',
        ...(reverse ? {properties: { class: 'reverse-page' }} : {}),
        css: {
            'margin-top': '-2px',
            'top': '-2px',
            width: '100%',
            position: 'relative',
            'padding-bottom': 'calc(1244 / 700 * 100%)',
        },
        components: [
            new BaseComponent({
                key: 'div',
                properties: {
                    class: reverse ? 'background reverse' : 'background'
                },
                css: {
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%'
                }
            }),
            new BaseComponent({
                key: 'div',
                css: {
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                },
                components: componenents
            })
        ]
    })
}
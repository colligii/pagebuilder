import { ClosedComponent } from "./closed-component";
import { TextComponent } from "./text-component";

export default function pix1Info(key: string, value: string) {
    return new ClosedComponent({
        key: 'div',
        components: [
            new TextComponent({
                key: 'span',
                css: {
                    'font-weight': 'bold',
                },
                text: `${key}:\t`
            }),
            new TextComponent({
                key: 'span',
                text: value
            })
        ]
    })
}
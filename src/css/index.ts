import { TextComponent } from "../component/text-component";
import { Minify } from "../minfy";
import { resetCss } from "./reset-css";

export class Css {
    static classes: { [p: string]: string } = {

    }

    static customCss: string [];

    static get component() {
        const styles = Object.entries(this.classes);

        return [
            new TextComponent({
                key: 'style',
                text: styles.map(([key, value]) => (`.${key} {${value}}`)).join('\n') + `\n${resetCss}\n` + this.customCss.join('\n')
            })
        ]
    }

    static registerCustomCss(css: string) {
        this.customCss.push(css);
    }

    static register(key: string, value: string) {
        let regex = / +|#+|\(+|\)+|\,+|\.+/ig
        const endKey = key.replace(regex, '') + '-' + value.replace(regex, '');
        Minify.registerCss(endKey);
        this.classes[endKey] = `${key}: ${value}`;
        return endKey;
    }

    static reset() {
        this.classes = {};
        this.customCss = [];
    }
}
import { TextComponent } from "../component/text-component";
import { Minify } from "../minfy";

export class Css {
    static classes: {[p: string]: string} = {

    }
    
    static get component() {
        const styles = Object.entries(this.classes);
        
        if(styles?.length) {
            return [
                new TextComponent({
                    key: 'style',
                    text: styles.map(([key, value]) => (`.${key} {${value}}`)).join('\n')
                })
            ]
        }

        return [];
    }

    static register(key: string, value: string) {
        const endKey = key.replace(/ {1,}|\#{1,}/ig, '')+'-'+value.replace(/ {1,}|\#{1,}/ig, '');
        Minify.registerCss(endKey);
        this.classes[endKey] = `${key}: ${value}`;
        return endKey;
    }

    static reset() {
        this.classes = {};
    }
}
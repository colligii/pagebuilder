import { TextComponent } from "../component/text-component";

export class Css {
    static classes: {[p: string]: string} = {

    }
    
    static get component() {
        const styles = Object.entries(this.classes);
        
        if(styles?.length) {
            return [
                new TextComponent('style', styles.map(([key, value]) => (`.${key} {${value}}`)).join('\n'))
            ]
        }

        return [];
    }

    static register(key: string, value: string) {
        const endKey = key.replace(' ', '')+'-'+value.replace(' ', '');
        this.classes[endKey] = `${key}: ${value}`;
        return endKey;
    }

    static reset() {
        this.classes = {};
    }
}
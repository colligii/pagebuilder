import { InjectHtmlComponent } from "../component/inject-html-component";
import { TextComponent } from "../component/text-component";

export class Script {
    static scripts: string[] = [];

    static register(fn: string) {
        this.scripts.push(fn);
    }

    static registerMultiple(scripts: string[]) {
        this.scripts = [...this.scripts, ...scripts];
    }

    static get component() {
        return new InjectHtmlComponent({
            key: 'script',
            html: this.scripts.join(';')
        });
    }

    static reset() {
        this.scripts = [];
    }
}
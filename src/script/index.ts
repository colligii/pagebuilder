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
        return this.scripts.map(item => new TextComponent('script', item));
    }

    static reset() {
        this.scripts = [];
    }
}
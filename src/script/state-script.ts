import { TextComponent } from "../component/text-component";

export class StateScript {
    static code: {[p: string]: string[]} = {

    }
    
    static get scriptJs() {
        return Object.entries(this.code)
            .map(([key, value]) => {
                return `
                    function ${this.getFunctionName(key)} () {
                        ${value.join(';\n')}
                    }
                `
            })
            .join('\n')
    }

    static getFunctionName(key: string) {
        return `change${key.replace(/\-/ig, '')}`;
    }

    static register(key: string, value: string) {
        this.generateFunction(key);
        this.code[key].push(value);
    }

    static generateFunction(key: string) {
        this.code[key] = this.code[key] ?? [];
        return this.getFunctionName(key);
    }

    static reset() {
        this.code = {};
    }
}

export class Script {
    static scripts: string[] = [];

    static register(fn: string) {
        this.scripts.push(fn);
    }

    static registerMultiple(scripts: string[]) {
        this.scripts = [...this.scripts, ...scripts];
    }

    static get scriptJS() {
        return this.scripts.join(';');
    }

    static reset() {
        this.scripts = [];
    }

    static arrowFunctionString(arrowFn: Function) {
        if(!arrowFn.toString().startsWith('()')) 
            throw new Error('You don\'t provide a arrow function or your arrow function have params that is not allowed');
    
        return arrowFn.toString();
    }

    static arrowFunctionInsideCode(arrowFn: Function) {
        const fn = this.arrowFunctionString(arrowFn);
        return fn.replace('()=>{', '').replace(/}$/, '');
    }

}

export default function registerCustomScript(arrowFn: Function) {
    const code = Script.arrowFunctionInsideCode(arrowFn)
    Script.register(code);
}
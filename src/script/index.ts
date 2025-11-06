import { minify } from "terser";
import { State } from "./state";
import { StateScript } from "./state-script";

export class Script {
    static scripts: string[] = [];
    static endScript: string[] = [];

    static register(fn: string) {
        this.scripts.push(fn);
    }

    static registerEnd(fn: string) {
        console.log(fn)
        this.endScript.push(fn);
    }

    static registerMultiple(scripts: string[]) {
        this.scripts = [...this.scripts, ...scripts];
    }

    static get scriptJS() {
        return [...this.scripts, ...this.endScript].join(';');
    }

    static reset() {
        this.endScript = [];
        this.scripts = [];
    }

    static arrowFunctionString(arrowFn: Function) {
        if (!arrowFn.toString().startsWith('()'))
            throw new Error('You don\'t provide a arrow function or your arrow function have params that is not allowed');

        return arrowFn.toString();
    }

    static arrowFunctionInsideCode(arrowFn: Function) {
        const fn = this.arrowFunctionString(arrowFn);
        return fn.replace('()=>{', '').replace(/}$/, '');
    }

    static async minifyJs(jsCode: string) {
        const result = await minify(jsCode, {
            compress: {
                passes: 3,            // Faz múltiplas passagens de compressão
                inline: true,         // Inlines funções usadas uma vez
                dead_code: true,      // Remove código morto
                unused: true,         // Remove variáveis não utilizadas
                toplevel: true,       // Remove variáveis/funções de escopo superior se não usadas

            },
            mangle: {
                toplevel: true        // Renomeia variáveis/funções globais também
            },
        });
        return result.code.replace(/\,__name\([a-zA-Z0-9\"\,]{1,}\)\,/ig, ';');
    }

}

export default function registerCustomScript(arrowFn: Function, optionalgStates?: State[]) {
    let code = Script.arrowFunctionInsideCode(arrowFn)

    const gStateMatch = new Set(code.match(/gstate\[[0-9]{1,}\]/ig) ?? []);

    const functionsName: string[] = [];

    [...gStateMatch]
        .forEach(gState => {

    if (!optionalgStates)
        throw new Error('State must be defined')

            let number = gState.replace(/\D{1,}/ig, '');
            const state = optionalgStates[Number(number)];

            if (!state)
                throw new Error('State that code trying to solve is not registered on generateScript');

            if (!state.scriptRegistered)
                state.registerScript();

            code = code.replace(new RegExp(`gstate\\[${number}\\]`, 'ig'), state.varName);

            functionsName.push(StateScript.generateFunction(state.rStateId) + '()')

        })

    code = code + ';\n' + functionsName.join(';');

    code = code.replace(/\;{2,}/, ';');
    

    Script.registerEnd(code);
}

export function registerSetInterval(arrowFn: Function, delay: number, optionalgStates?: State[]) {
let code = Script.arrowFunctionInsideCode(arrowFn);
    const gStateMatch = new Set(code.match(/gstate\[[0-9]{1,}\]/ig) ?? []);

    const functionsName: string[] = [];

    [...gStateMatch]
        .forEach(gState => {

    if (!optionalgStates)
        throw new Error('State must be defined')

            let number = gState.replace(/\D{1,}/ig, '');
            const state = optionalgStates[Number(number)];

            if (!state)
                throw new Error('State that code trying to solve is not registered on generateScript');

            if (!state.scriptRegistered)
                state.registerScript();

            code = code.replace(new RegExp(`gstate\\[${number}\\]`, 'ig'), state.varName);

            functionsName.push(StateScript.generateFunction(state.rStateId) + '()')

        })

    code = code + ';\n' + functionsName.join(';');

    code = code.replace(/\;{2,}/, ';');

    console.log(`setInterval(() => {${code}}, ${delay})`)

    Script.registerEnd(`setInterval(() => {${code}}, ${delay})`);
}


export function registerCreateFunction(arrowFn: Function, functionName: string, optionalParams: string[] = [], optionalgStates?: State[]) {
    let code = Script.arrowFunctionInsideCode(arrowFn);

    const gStateMatch = new Set(code.match(/gstate\[[0-9]{1,}\]/ig) ?? []);

    const functionsName: string[] = [];

    [...gStateMatch]
        .forEach(gState => {

    if (!optionalgStates)
        throw new Error('State must be defined')

            let number = gState.replace(/\D{1,}/ig, '');
            const state = optionalgStates[Number(number)];

            if (!state)
                throw new Error('State that code trying to solve is not registered on generateScript');

            if (!state.scriptRegistered)
                state.registerScript();

            code = code.replace(new RegExp(`gstate\\[${number}\\]`, 'ig'), state.varName);

            functionsName.push(StateScript.generateFunction(state.rStateId) + '()')

        })

    code = code + ';\n' + functionsName.join(';');

    code = code.replace(/\;{2,}/, ';');

    Script.registerEnd(`function ${functionName}(${optionalParams.join(', ')}) {${code}}`);
}
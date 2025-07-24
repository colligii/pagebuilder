import { randomUUID } from "crypto";
import { Script } from ".";
import { StateScript } from "./state-script";

export class State {

    scriptRegistered = false;
    rStateId = randomUUID();
    varName: string;

    constructor(
        private value: any
    ) {
        this.varName = 'state'+this.rStateId.replace(/\-/ig, '');
    }

    getValue() {
        return this.value;
    }

    get jsValue() {
        if(typeof this.value === 'string') {
            return `"${this.value}"`;
        }
    }

    addReactiveJs(jsCode: string) {
        StateScript.register(this.rStateId, `${jsCode} = ${this.varName}`);
    }

    registerScript() {
        if(!this.scriptRegistered) {
            Script.register(`let ${this.varName} = ${this.jsValue}`)
            this.scriptRegistered = true;
        }
    }

    generateScript(fn: Function, optionalGstates: State[] = []) {
        let arrowFn = Script.arrowFunctionInsideCode(fn)
        const gStateMatch = new Set(arrowFn.match(/gstate\[[0-9]{1,}\]/ig) ?? []);

        const functionsName: string[] = [];

        [...gStateMatch]
            .forEach(gState => {
                let number = gState.replace(/\D{1,}/ig, '');
                const state = number == '0' ? this : optionalGstates[Number(number) - 1];

                if(!state)
                    throw new Error('State that code trying to solve is not registered on generateScript');

                if(!state.scriptRegistered)
                    state.registerScript();

                arrowFn = arrowFn.replace(new RegExp(`gstate\\[${number}\\]`, 'ig'), state.varName);

                functionsName.push(StateScript.generateFunction(state.rStateId)+'()')

            })

        arrowFn = arrowFn + ';\n' + functionsName.join(';');

        arrowFn = arrowFn.replace(/\;{2,}/, ';');

        return new Function(arrowFn)
    } 
}
import { randomUUID } from "crypto";
import { Script } from ".";
import { TextComponent } from "../component/text-component";
import { StateScript } from "./StateScript";

export class State {
    
    id: string = randomUUID();
    varName: string;
    registered: boolean = false;

    constructor(
        private value: any
    ) {
        this.varName = 'state'+this.id.replace(/\-/ig, '');
    }

    getValue() {
        return this.value;
    }

    rightValue() {
        if(typeof this.value === 'string') {
            return `"${this.value}"`;
        }

        return this.value;
    }

    generateFunction(fn: Function) {
        if(!this.registered) {
            Script.register(`let ${this.varName} = ${this.rightValue()};`);
            this.registered = true;
        }

        return new RenderState(fn, this.varName);
    }

    addWhenChange(fn: Function, rid: string) {
        return StateScript.register(fn.toString().replace(/rid/ig, rid).replace(/gstate/ig, this.varName), this.varName)
    }

}

export class RenderState {

    constructor(
        private fn: Function,
        private varName: string
    ) {}

    getCorrectFunction() {
        return `${this.fn.toString().replace(/gstate/ig, this.varName).replace('}', ';'+StateScript.getName(this.varName)+'()}')}`
    }

}
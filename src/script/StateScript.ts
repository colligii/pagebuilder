export class StateScript {
    static stateFunctions: {[p: string]: string[]} = {};
    static register(js: string, varName: string) {
        const clearJs = js.replace('()=>{', '').replace('function(){', '').replace('}', '')
        this.stateFunctions[varName] = this.stateFunctions[varName] ?? [];
        this.stateFunctions[varName].push(clearJs);
        return `change${varName}`
    }

    static get component() {
        const stateScript =  Object.entries(this.stateFunctions);

        return stateScript.map(([varName, line]) => (`function change${varName}() {${line.join(';')}}`)).join('\n')
    }

    static getName(varName: string) {
        return `change${varName}`
    }
}
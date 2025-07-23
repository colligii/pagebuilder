export class HTMLHelper {

    static selfClosedTags: {[p: string]: boolean} = {
        img: true
    }

    static isVoidElement(tag: string) {
        return !!this.selfClosedTags[tag];
    }

}
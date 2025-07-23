export class HTMLHelper {

    static selfClosedTags: {[p: string]: boolean} = {
        img: true
    }

    static isSelfClosed(tag: string) {
        return !!this.selfClosedTags[tag];
    }

}
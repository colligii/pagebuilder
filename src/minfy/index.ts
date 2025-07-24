export class Minify {
    private static rid: { [p: string]: string } = {};
    private static css: { [p: string]: string } = {};

    static ridDisabled = false;
    static cssDisabled = false;
    static htmlMinify = true;

    private static generateCode(num: number) {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';

        let result = '';

        while (num > 0) {
            num--;
            result = alphabet[num % 26] + result;
            num = Math.floor(num / 26);
        }

        return result;
    }

    static registerRid(rid: string) {
        this.rid[rid] = this.generateCode(Object.entries(this.rid).length + 2);
    }

    static registerCss(className: string) {
        this.css[className] = this.generateCode(Object.entries(this.css)?.length + 30);
    }

    static get rids() {
        return Object.entries(this.rid);
    }

    static get styles() {
        return Object.entries(this.css);
    }

    static minifyHtml(html: string) {
        if(!this.ridDisabled)
            this.rids
                .forEach(item => {
                    html = html.replace(new RegExp(item[0], 'ig'), item[1]);
                })

        if(!this.cssDisabled)
            this.styles
                .forEach(item => {
                    html = html.replace(new RegExp(item[0], 'ig'), item[1])
                })

        return html;
    }

    static reset() {
        this.rid = {};
        this.css = {}
    }
}
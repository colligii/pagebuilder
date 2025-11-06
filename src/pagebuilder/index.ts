import { PageRoutes } from "./types";
import fs from 'fs';
import path from 'path';
import { Css } from "../css";
import { Script } from "../script";
import { StateScript } from "../script/state-script";
import { Minify } from "../minfy";
import { Build } from "../build/build";
import { Queue } from "../queue";

export class PageBuilder {

    constructor(
    ) { }

    get outDir() {
        return Build.outDir
    }

    async createFile(html: string, fileName: string) {
        const dir = path.join(process.cwd(), this.outDir);

        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        fs.writeFileSync(path.join(process.cwd(), this.outDir, fileName), html, 'utf-8');        
    }

    async buildPages(routes: PageRoutes[]) {
        for (let item of routes) {
            item.component = item.component();
            const html = Minify.minifyHtml(await item.component.build());
            console.log('saving')
            
            if (item.isIndex) {
                this.createFile(html, `${item.path.replace('index.html', '')}index.html`);
            } else {
            
                this.createFile(html, item.path);
            }

            Css.reset();
            Script.reset();
            StateScript.reset();
            Minify.reset();
        }

        await Queue.resolveAllPromise();
    }

}
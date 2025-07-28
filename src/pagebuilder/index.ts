import { PageRoutes } from "./types";
import fs from 'fs';
import path from 'path';
import { Css } from "../css";
import { Script } from "../script";
import { StateScript } from "../script/state-script";
import { Minify } from "../minfy";

export class PageBuilder {

    constructor(
        private outDir: string = "output"
    ) { }

    async createFile(html: string) {
        const dir = path.join(process.cwd(), this.outDir);

        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        fs.writeFileSync(path.join(process.cwd(), this.outDir, 'index.html'), html, 'utf-8');        
    }

    async buildPages(routes: PageRoutes[]) {
        for (let item of routes) {
            const html = Minify.minifyHtml(await item.component.build());
            console.log('saving')
            
            if (item.isIndex) {
                this.createFile(html);
            } else {
            
                this.createFile(html);
            }

            Css.reset();
            Script.reset();
            StateScript.reset();
            Minify.reset();
        }
    }

}
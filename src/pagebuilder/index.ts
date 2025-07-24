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

    async buildPages(routes: PageRoutes[]) {
        for (let item of routes) {
            const html = Minify.minifyHtml(await item.component.build());
            console.log('saving')
            
            if (item.isIndex) {
                fs.writeFileSync(path.join(process.cwd(), this.outDir, 'index.html'), html, 'utf-8');
            } else {
                fs.writeFileSync(path.join(process.cwd(), this.outDir, 'home.html'), html, 'utf-8')
            }

            Css.reset();
            Script.reset();
            StateScript.reset();
            Minify.reset();
        }
    }

}
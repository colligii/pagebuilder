import { PageRoutes } from "./types";
import fs from 'fs';
import path from 'path';
import { Css } from "../css";

export class PageBuilder {

    constructor(
        private outDir: string = "output"
    ) {}

    buildPages(routes: PageRoutes[]) {
        routes.forEach(item => {
            if(item.isIndex) {
                const html = item.component.build();
                console.log('saving')
                fs.writeFileSync(path.join(process.cwd(), this.outDir, 'index.html'), html, 'utf-8');
            }

            Css.reset();
        })
    }

}
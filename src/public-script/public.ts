import path from "path";
import { PageBuilder } from "../pagebuilder";
import { Build } from "../build/build";
import fs from 'fs';

export class PublicPath {
    static publicFolder = path.join(process.cwd(), 'src', 'public');
    static outFolder = path.join(process.cwd(), Build.outDir, 'public')

    private static isExecuted = false;

    private static createPublicDir() {
        if(!this.isExecuted) {
            fs.mkdirSync(this.outFolder, { recursive: true });
            this.isExecuted = true;
        }
    }

    static fileAddress(fileName: string) {
        this.createPublicDir();
        return path.join(this.publicFolder, fileName);
    }

    static outFileAddress(fileName: string) {
        this.createPublicDir();
        return path.join(this.outFolder, fileName);
    }

    static cpToOutFolder(fileName: string) {
        fs.copyFileSync(this.fileAddress(fileName), this.outFileAddress(fileName));
    }
}
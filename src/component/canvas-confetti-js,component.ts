import { InjectHtmlComponent } from "./inject-html-component";
import { readFileSync } from 'fs';
import { join } from 'path'

export function canvasConfettiComponent() {
    const html = readFileSync(join(process.cwd(), 'src/public/canvas-confetti.js'), 'utf-8')
    return new InjectHtmlComponent({
        key: 'script',
        html
    })
}
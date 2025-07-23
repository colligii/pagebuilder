import { ClosedComponent } from "../component/closed-component";
import { TextComponent } from "../component/text-component";
import { Page } from "../page";

const page = new Page(
    'main-page',
    [
        new ClosedComponent('div', [
            new ClosedComponent('div', [
                new TextComponent('span', 'Oudri kandra larrai')
            ])
        ], {})
    ]
);

export default page;
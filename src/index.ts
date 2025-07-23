import { Page } from "./page";
import { PageBuilder } from "./pagebuilder";

new PageBuilder().buildPages([
    {
        isIndex: true,
        component: require('./pages/index').default
    }
])
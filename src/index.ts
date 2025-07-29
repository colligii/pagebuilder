import { Minify } from "./minfy";
import { Page } from "./page";
import { PageBuilder } from "./pagebuilder";

// Minify.cssDisabled = true;
// Minify.ridDisabled = true;
// Minify.htmlMinify = false;

new PageBuilder().buildPages([
    {
        isIndex: true,
        component: require('./pages/index').default,
        path: '',
    },
    {
        isIndex: false,
        component: require('./pages/home').default,
        path: 'home.html'
    }
])
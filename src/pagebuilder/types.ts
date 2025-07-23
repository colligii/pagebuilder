import { Page } from "../page";

export type PageRoutes = PageRoutesNormal | PageRoutesIndex;

interface PageRoutesIndex {
    isIndex: true;
    component: Page
}

interface PageRoutesNormal {
    isIndex?: false;
    component: Page
}
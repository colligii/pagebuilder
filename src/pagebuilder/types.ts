import { Page } from "../page";

export type PageRoutes = PageRoutesNormal | PageRoutesIndex;

interface PageRoutesIndex {
    isIndex: true;
    component: Page;
    path: string;
}

interface PageRoutesNormal {
    isIndex?: false;
    component: Page;
    path: string
}
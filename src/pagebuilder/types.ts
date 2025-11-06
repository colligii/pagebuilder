import { Page } from "../page";

export type PageRoutes = PageRoutesNormal | PageRoutesIndex;

interface PageRoutesIndex {
    isIndex: true;
    component: Function;
    path: string;
}

interface PageRoutesNormal {
    isIndex?: false;
    component: Function;
    path: string
}
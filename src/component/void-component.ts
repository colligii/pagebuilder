import { BaseComponent } from "./base-component";

export class VoidComponent extends BaseComponent {

    constructor(
        props: VoidComponentInput,
    ) {
        super(props);
    }
}

export interface VoidComponentInput {
    key: string;
    properties?: { [p: string]: string },
    css?: { [p: string]: string },
}
import { BaseComponent } from "./base-component";
import { ClosedComponent } from "./closed-component";
import { ImgComponent } from "./img-component";
import { SelfClosedComponent } from "./self-closed-component";

export type Component = ImgComponent | SelfClosedComponent | BaseComponent | ClosedComponent;

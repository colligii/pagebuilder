import { BaseComponent } from "./base-component";
import { ClosedComponent } from "./closed-component";
import { ImgComponent } from "./img-component";
import { VoidComponent } from "./void-component";

export type Component = ImgComponent | VoidComponent | BaseComponent | ClosedComponent;

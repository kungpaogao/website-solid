import { Component, JSXElement } from "solid-js";
import Navigation from "./Navigation";

type LayoutProps = {
  children: JSXElement;
};

const Layout: Component<LayoutProps> = (props) => {
  return (
    <div class="mx-auto max-w-7xl">
      <Navigation />
      <main class="px-3">{props.children}</main>
    </div>
  );
};

export default Layout;

import { Component, JSXElement } from "solid-js";
import Navigation from "./Navigation";

type LayoutProps = {
  children: JSXElement;
};

const Layout: Component<LayoutProps> = ({ children }) => {
  return (
    <div class="mx-auto max-w-7xl">
      <Navigation />
      <main class="px-3">{children}</main>
    </div>
  );
};

export default Layout;

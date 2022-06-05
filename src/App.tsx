import { useRoutes } from "solid-app-router";
import { Component, lazy } from "solid-js";
import Navigation from "./components/Navigation";
import { routes } from "./routes";

const App: Component = () => {
  const Routes = useRoutes(routes);

  return (
    <>
      <Navigation />
      <Routes />
    </>
  );
};

export default App;

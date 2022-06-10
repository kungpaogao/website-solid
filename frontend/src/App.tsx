import { useRoutes } from "solid-app-router";
import { Component } from "solid-js";
import Layout from "./components/Layout";
import { routes } from "./routes";

const App: Component = () => {
  const Routes = useRoutes(routes);

  return (
    <>
      <Layout>
        <Routes />
      </Layout>
    </>
  );
};

export default App;

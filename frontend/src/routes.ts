import { RouteDefinition, useRoutes } from "solid-app-router";
import { lazy } from "solid-js";

export const routes: RouteDefinition[] = [
  { path: "/", component: lazy(() => import("./pages/index.js")) },
  { path: "/projects", component: lazy(() => import("./pages/projects.js")) },
  { path: "/about", component: lazy(() => import("./pages/about.js")) },
  // {
  //   path: "/projects/:id",
  //   component: lazy(() => import("./pages/projects/[id].js")),
  // },
];

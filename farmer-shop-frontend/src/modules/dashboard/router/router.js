import children from "./children";

export default {
  path: "/dashboard",
  name: "Dashboard",
  component: () => import("../pages/index.vue"),
  children: children
};

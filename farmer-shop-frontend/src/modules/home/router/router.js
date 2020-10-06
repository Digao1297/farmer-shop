import children from "./children";

export default {
  path: "",
  name: "",
  component: () => import("../pages/index.vue"),
  children: children,
  redirect: "/dashboard",
};

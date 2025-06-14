import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    menu?: boolean;
    label?: string;
  }
}

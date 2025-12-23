import { createFileRoute } from "@tanstack/react-router";
import { BASE_ROUTE } from "./constant";
import { App } from "../app/app";

export const Route = createFileRoute(BASE_ROUTE)({
  component: App,
});

import type { V2_MetaFunction } from "@remix-run/node";
import { HomeView } from "~/views";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Remix Starter" },
    { name: "description", content: "Remix.run - starter" },
  ];
};

export default function Index() {
  return (
    <HomeView />
  );
}

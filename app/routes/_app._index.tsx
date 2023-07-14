import type { V2_MetaFunction } from "@remix-run/node";
import { HomeView } from "~/views";

export const meta: V2_MetaFunction = () => {  
  return [
    { title: "Remix Starter" },
    { name: "description", content: "Remix.run - starter" },
    { name: "keywords", content: "remix, starter, seo" },
    { name: "og:title", content: "Remix.run - starter" },
    { name: "og:site_name", content: "Remix.run" },
    { name: "og:description", content: "Remix.run - starter Description" },
    { name: "google-analytics", content: "customga" },
    { name: "google-site-verification", content: "customgoogle-site-verification" },
    { name: "apple-mobile-web-app-title", content: "appletitle" },
  ];
};

export default function Index() {
  return (
    <HomeView />
  );
}

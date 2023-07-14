import { Outlet } from "@remix-run/react";
import { Footer, Header } from "~/components";

export default function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
import type { V2_MetaFunction } from "@remix-run/node";
import { ProductsView } from "~/views";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Products - Remix Run" },
    { name: "description", content: "Produkty" },
  ];
};

export default function Products() {
  return <ProductsView />;
}

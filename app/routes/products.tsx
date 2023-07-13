import type { TypedResponse, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { ProductSettings } from "~/interfaces";
import { ProductsView } from "~/views";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Products - Remix Run" },
    { name: "description", content: "Produkty" },
  ];
};

export async function loader(): Promise<TypedResponse<ProductSettings[]>> {
  const res = await fetch("https://fakestoreapi.com/products");
  return json(await res.json());
}

export default function Products() {
  return <ProductsView />;
}

import type { AppLoadContext, EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { createInstance } from "i18next";
import { renderToString } from "react-dom/server";
import { initReactI18next, I18nextProvider } from "react-i18next";
import { ServerStyleSheet } from "styled-components";
import i18n from "./translations/i18n";
import i18next from "./translations/i18next.server";
import Backend from "i18next-fs-backend";
import { resolve } from "node:path";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext,
) {
  const sheet = new ServerStyleSheet();
  let instance = createInstance();
  let lng = await i18next.getLocale(request);
  let ns = i18next.getRouteNamespaces(remixContext);

  await instance
    .use(initReactI18next)
    .use(Backend)
    .init({
      ...i18n,
      lng,
      ns,
      backend: {
        loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json"),
      },
    });

  let markup = renderToString(
    sheet.collectStyles(
      <I18nextProvider i18n={instance}>
      <RemixServer context={remixContext} url={request.url} />
      </I18nextProvider>
    ),
  );
  const styles = sheet.getStyleTags();

  markup = markup.replace("__STYLES__", styles);

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
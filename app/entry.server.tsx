import type { EntryContext } from "@remix-run/node";
import { PassThrough } from "stream";
import { RemixServer } from "@remix-run/react";
import { renderToPipeableStream, renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import { Response } from "@remix-run/node";
import { createInstance } from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import Backend from "i18next-fs-backend";
import { resolve } from "node:path";
import i18next from "./translations/i18next.server";
import i18n from "./translations/i18n";
import isbot from "isbot";

const ABORT_DELAY = 5000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const sheet = new ServerStyleSheet();
  let callbackName = isbot(request.headers.get("user-agent"))
    ? "onAllReady"
    : "onShellReady";
  let instance = createInstance();
  let lng = await i18next.getLocale(request);
  let ns = i18next.getRouteNamespaces(remixContext);

  await instance
    .use(initReactI18next) // Tell our instance to use react-i18next
    .use(Backend) // Setup our backend
    .init({
      ...i18n, // spread the configuration
      lng, // The locale we detected above
      ns, // The namespaces the routes about to render wants to use
      backend: { loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json") },
    });

  let markup = renderToString(
    <I18nextProvider i18n={instance}>
      <RemixServer
        context={remixContext}
        url={request.url}
      />
    </I18nextProvider>
  );
  const styles = sheet.getStyleTags();
  markup = markup.replace("__STYLES__", styles);

  return new Promise((resolve, reject) => {
    let didError = false;

    let { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={instance}>
        <RemixServer context={remixContext} url={request.url} />
      </I18nextProvider>,
      {
        [callbackName]: () => {
          const body = new PassThrough();

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            })
          );

          body.write(
            `<!DOCTYPE html><html><head><!--start head-->${markup}<!--end head--></head><body><div id="root">`
          );
          pipe(body);
          body.write(`</div></body></html>`);
        },
        onShellError(err: unknown) {
          reject(err);
        },
        onError(error: unknown) {
          didError = true;

          console.error(error);
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

import { RemixBrowser } from "@remix-run/react";
import i18next from "i18next";
import { hydrate } from "react-dom";
import { initReactI18next, I18nextProvider } from "react-i18next";
import { getInitialNamespaces } from "remix-i18next";
import i18n from "./translations/i18n";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import type { LoadServiceWorkerOptions} from '@remix-pwa/sw';
import { loadServiceWorker } from '@remix-pwa/sw';

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // we will register it after the page complete the load
    navigator.serviceWorker.register("/sw.js");
  });
}

const options: LoadServiceWorkerOptions = {
  serviceWorkerUrl: '/entry.worker.ts',
};
loadServiceWorker(options);


i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    ...i18n, // The same config we created for the server
    ns: getInitialNamespaces(),
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    detection: {
      order: ["htmlTag"],
      caches: [],
    },
  })
  .then(() => {
    // After i18next init, hydrate the app
    hydrate(
      // Wrap RemixBrowser in I18nextProvider
      <I18nextProvider i18n={i18next}>
        <RemixBrowser />
      </I18nextProvider>,
      document
    );
  });

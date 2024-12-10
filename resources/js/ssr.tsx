import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        resolve: (name) => {
            const pages = import.meta.glob("./pages/**/*.tsx", { eager: true });
            return pages[`./pages/${name}.tsx`];
        },
        setup: ({ App, props }) => <App {...props} />,
        title: (title) => `${title} - ${appName}`,
    }),
);

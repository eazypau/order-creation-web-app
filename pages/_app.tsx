import "../styles/globals.css";
import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import type { ServerRouter } from "../server/router";

const App: AppType = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
};

export default withTRPC<ServerRouter>({
    config({ ctx }) {
        const url =
            process.env.NODE_ENV === "production"
                ? `https://${process.env.HEROKU_URL}/api/trpc`
                : "http://localhost:3000/api/trpc";

        return { url };
    },
    ssr: true,
})(App);

import { AppType } from "next/dist/shared/lib/utils";
import "../styles/globals.css";
import { trpc } from "../utils/trpc";

const MyApp: AppType = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
};

export default trpc.withTRPC(MyApp);
// import { withTRPC } from "@trpc/next";
// import { AppType } from "next/dist/shared/lib/utils";
// import type { ServerRouter } from "../server/router";

// const App: AppType = ({ Component, pageProps }) => {
//     return <Component {...pageProps} />;
// };

// export default withTRPC<ServerRouter>({
//     config({ ctx }) {
//         const url =
//             process.env.NODE_ENV === "production"
//                 ? `${process.env.VERCEL_URL}/api/trpc`
//                 : "http://localhost:3000/api/trpc";

//         return { url };
//     },
//     ssr: true,
// })(App);

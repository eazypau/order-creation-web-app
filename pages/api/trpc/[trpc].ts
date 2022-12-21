import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/router/_app";

export default trpcNext.createNextApiHandler({
    router: appRouter,
});

// import * as trpcNext from "@trpc/server/adapters/next";
// import { appRouter } from "../../../server/router";
// import { createContext } from "../../../server/context";
// import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
// import Cors from "cors";

// https://www.npmjs.com/package/cors#enable-cors-for-a-single-route
// https://github.com/trpc/trpc/discussions/2019
// const cors = Cors({
//     origin: "https://order-creation-web-app-vd9x.vercel.app",
//     optionsSuccessStatus: 200,
// });

// function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
//     return new Promise((resolve, reject) => {
//         fn(req, res, (result: any) => {
//             if (result instanceof Error) {
//                 return reject(result);
//             }

//             return resolve(result);
//         });
//     });
// }

// function withCors(handler: NextApiHandler) {
//     return async (req: NextApiRequest, res: NextApiResponse) => {
//         const data = await runMiddleware(req, res, cors);
//         console.log(data);

//         return await handler(req, res);
//     };
// }

// export default withCors(
//     );
// trpcNext.createNextApiHandler({
//     router: appRouter,
//     createContext,
// });

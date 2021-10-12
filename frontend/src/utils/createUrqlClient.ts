import { cacheExchange, Resolver, Cache } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange, gql, stringifyVariables } from "urql";

export const createUrqlClient = (ssrExchange: any) => {
  return {
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include" as const,
    },
    exchanges: [dedupExchange, cacheExchange({}), ssrExchange, fetchExchange],
  };
};

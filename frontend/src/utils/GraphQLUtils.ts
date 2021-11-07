import {
  MutationUpdaterFunction,
  DefaultContext,
  ApolloCache,
} from "@apollo/client";
import {
  LogoutMutation,
  Exact,
  MeQuery,
  MeDocument,
} from "../generated/graphql";

export const updateLogout:
  | MutationUpdaterFunction<
      LogoutMutation,
      Exact<{
        [key: string]: never;
      }>,
      DefaultContext,
      ApolloCache<any>
    >
  | undefined = (cache) => {
  cache.writeQuery<MeQuery>({
    query: MeDocument,
    data: {
      __typename: "Query",
      me: null,
    },
  });
};

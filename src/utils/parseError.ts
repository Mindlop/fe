import { ApolloError } from "@apollo/client/core";

export default function parseError(e: any) {
  if (e instanceof ApolloError) {
    return e.message;
  } else {
    return e;
  }
}

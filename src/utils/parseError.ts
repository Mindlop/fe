import { ApolloError } from "@apollo/client/core";

export default function parseError(e: any) {
  if (e instanceof ApolloError) {
    return (
      e.message
        .split(",")[1]
        ?.split('"')
        .slice(1, -1)
        .join(" ")
        .replaceAll("\\", "") ?? e.message
    );
  } else {
    return e;
  }
}

import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { readCookie } from "../utils/cookie";

export default function useGqlClient() {
  const client = () => {
    const token = readCookie("token");

    return new ApolloClient({
      uri: import.meta.env.VITE_GQL_ENDPOINT,
      cache: new InMemoryCache(),
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  };

  return client;
}

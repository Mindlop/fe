import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client/core";
import { readCookie } from "../utils/cookie";

class GqlClientState {
  private static _isInit = false;
  private static _client: ApolloClient<NormalizedCacheObject>;

  static init() {
    if (!GqlClientState._isInit) {
      GqlClientState._isInit = true;
      GqlClientState.update();
    }
  }

  static update() {
    const token = readCookie("token");

    GqlClientState._client = new ApolloClient({
      uri: import.meta.env.VITE_GQL_ENDPOINT,
      cache: new InMemoryCache(),
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  }

  static get client() {
    return () => GqlClientState._client;
  }
}

export default function useGqlClient(): [
  () => ApolloClient<NormalizedCacheObject>,
  () => void
] {
  GqlClientState.init();

  return [GqlClientState.client, GqlClientState.update];
}

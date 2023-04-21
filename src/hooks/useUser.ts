import { Accessor, Setter, createSignal } from "solid-js";
import useGqlClient from "./useGqlClient";
import { NormalizedCacheObject, gql } from "@apollo/client/core";
import { ApolloClient } from "@apollo/client/core";
import { readCookie } from "../utils/cookie";

class UserState {
  private static _isInit = false;
  private static _gqlClient: () => ApolloClient<NormalizedCacheObject>;
  private static _user: Accessor<UserT>;
  private static _setUser: Setter<UserT>;
  private static _loading: Accessor<boolean>;
  private static _setLoading: Setter<boolean>;

  static async init() {
    if (!UserState._isInit) {
      UserState._isInit = true;
      UserState._gqlClient = useGqlClient()[0];
      [UserState._user, UserState._setUser] = createSignal<UserT>({} as UserT);
      [UserState._loading, UserState._setLoading] = createSignal(false);
      await UserState.update();
    }
  }

  static reset() {
    UserState._setUser({} as UserT);
    UserState._setLoading(false);
  }

  static async update() {
    if (!readCookie("token")) return;

    UserState._setLoading(true);

    const res = await UserState._gqlClient().query<{ user: UserT }>({
      query: gql`
        query User {
          user {
            media {
              url
              mimeType
            }
            name
            email
            username
            dateOfBirth
            createdAt
            passwordChangedAt
          }
        }
      `,
      fetchPolicy: "no-cache",
    });

    UserState._setUser(res.data.user);

    UserState._setLoading(false);
  }

  static get user() {
    return UserState._user;
  }

  static get isLoading() {
    return UserState._loading;
  }
}

export default function useUser() {
  UserState.init();

  function mediaType() {
    const mimeType = UserState.user().media?.mimeType?.toLowerCase();
    if (mimeType?.startsWith("image")) {
      return "image";
    } else if (mimeType?.startsWith("video")) {
      return "video";
    } else {
      return "unknown";
    }
  }
  return {
    init: UserState.init,
    user: UserState.user,
    mediaType,
    isLoading: UserState.isLoading,
    update: UserState.update,
    reset: UserState.reset,
  };
}

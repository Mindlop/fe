import { ApolloError, gql } from "@apollo/client/core";
import { deleteCookie, readCookie, saveCookie } from "../utils/cookie";
import useGqlClient from "./useGqlClient";
import useUser from "./useUser";
import parseJwt from "../utils/parseJwt";

export default function useAuth() {
  const [gqlClient, gqlClientUpdate] = useGqlClient();
  const user = useUser();

  async function signIn(email: string, password: string) {
    const token = readCookie("token");
    const res = await gqlClient().mutate<{
      signin: { token: string };
    }>({
      mutation: gql`
        mutation SignIn(
          $email: String!
          $password: String!
          $clientId: UUID
          $clientInfo: String
        ) {
          signin(
            email: $email
            password: $password
            clientId: $clientId
            clientInfo: $clientInfo
          ) {
            token
          }
        }
      `,
      variables: {
        email,
        password,
        clientId: token ? parseJwt<AuthT>(token).clientId : undefined,
        clientInfo: navigator.userAgent,
      },
    });

    if (!res.data) throw res.errors;

    const signInData = parseJwt<AuthT>(res.data.signin.token);

    deleteCookie("token");
    saveCookie({
      key: "token",
      value: res.data.signin.token,
      expires: new Date(signInData.exp * 1000).toUTCString(),
    });

    gqlClientUpdate();
    await user.update();
  }

  async function requestResetPassword(email: string) {
    const res = await gqlClient().mutate<{
      requestResetPassword: { success: boolean };
    }>({
      mutation: gql`
        mutation RequestResetPassword($email: String!) {
          requestResetPassword(email: $email) {
            success
          }
        }
      `,
      variables: {
        email,
      },
    });

    if (!res.data) throw res.errors;
  }

  async function verifyRequestResetPassword(email: string, verifyCode: string) {
    const res = await gqlClient().mutate<{
      verifyRequestResetPassword: { success: boolean };
    }>({
      mutation: gql`
        mutation VerifyRequestResetPassword(
          $email: String!
          $verifyCode: String!
        ) {
          verifyRequestResetPassword(email: $email, verifyCode: $verifyCode) {
            success
          }
        }
      `,
      variables: {
        email,
        verifyCode,
      },
    });

    if (!res.data) throw res.errors;
  }

  function signOut() {
    deleteCookie("token");
    gqlClientUpdate();
    user.reset();
    window.location.reload();
  }

  async function resetPassword(
    email: string,
    verifyCode: string,
    newPassword: string
  ) {
    const res = await gqlClient().mutate({
      mutation: gql`
        mutation ResetPassword(
          $email: String!
          $verifyCode: String!
          $newPassword: String!
        ) {
          resetPassword(
            email: $email
            verifyCode: $verifyCode
            newPassword: $newPassword
          ) {
            success
          }
        }
      `,
      variables: {
        email,
        verifyCode,
        newPassword,
      },
    });

    if (!res.data) throw res.errors;
  }

  async function signUp(
    name: string,
    email: string,
    username: string,
    password: string,
    dateOfBirth: string
  ) {
    const res = await gqlClient().mutate<{ signup: { success: boolean } }>({
      mutation: gql`
        mutation SignUp(
          $name: String!
          $email: String!
          $username: String!
          $password: String!
          $dateOfBirth: String!
        ) {
          signup(
            name: $name
            email: $email
            username: $username
            password: $password
            dateOfBirth: $dateOfBirth
          ) {
            success
          }
        }
      `,
      variables: {
        name,
        email,
        username,
        password,
        dateOfBirth,
      },
    });

    if (!res.data) throw res.errors;
  }

  async function verifySignUp(email: string, verifyCode: string) {
    const res = await gqlClient().mutate<{
      verifySignUp: { success: boolean };
    }>({
      mutation: gql`
        mutation VerifySignUp($email: String!, $verifyCode: String!) {
          verifySignUp(email: $email, verifyCode: $verifyCode) {
            success
          }
        }
      `,
      variables: {
        email,
        verifyCode,
      },
    });

    if (!res.data) throw res.errors;
  }

  async function validateToken() {
    if (!readCookie("token")) {
      return false;
    }

    try {
      const res = await gqlClient().mutate<{
        validateToken: { token: string };
      }>({
        mutation: gql`
          mutation ValidateToken {
            validateToken {
              token
            }
          }
        `,
      });

      if (!res.data) throw res.errors;

      const signInData = parseJwt<AuthT>(res.data.validateToken.token);

      deleteCookie("token");
      saveCookie({
        key: "token",
        value: res.data.validateToken.token,
        expires: new Date(signInData.exp * 1000).toUTCString(),
      });

      gqlClientUpdate();
      await user.update();
      return true;
    } catch (e) {
      if (!(e instanceof ApolloError && e.networkError)) {
        signOut();
      }
      throw e;
    }
  }

  return {
    signIn,
    requestResetPassword,
    verifyRequestResetPassword,
    resetPassword,
    signOut,
    signUp,
    verifySignUp,
    validateToken,
  };
}

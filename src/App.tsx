import { RouteDefinition, useRoutes } from "@solidjs/router";
import { Component, lazy } from "solid-js";
import { Toaster } from "solid-toast";
import SitePath from "./data/sitePath";

const routes: RouteDefinition[] = [
  {
    path: SitePath.base,
    children: [
      {
        path: "/",
        component: lazy(() => import("./screens/HomeScreen")),
      },
      {
        path: SitePath.auth,
        component: lazy(() => import("./screens/auth/AuthWrapper")),
        children: [
          {
            path: "/",
            component: lazy(() => import("./screens/auth/AuthScreen")),
          },
          {
            path: SitePath.signIn,
            component: lazy(() => import("./screens/auth/signIn/SignInScreen")),
          },
          {
            path: SitePath.signUp,
            children: [
              {
                path: "/",
                component: lazy(
                  () => import("./screens/auth/signUp/SignUpScreen")
                ),
              },
              {
                path: SitePath.verifySignUp,
                component: lazy(
                  () => import("./screens/auth/signUp/VerifySignUpScreen")
                ),
              },
              {
                path: SitePath.signUpSuccess,
                component: lazy(
                  () => import("./screens/auth/signUp/SuccessSignUpScreen")
                ),
              },
            ],
          },
          {
            path: SitePath.resetPassword,
            children: [
              {
                path: "/",
                component: lazy(
                  () =>
                    import("./screens/auth/resetPassword/ResetPasswordScreen")
                ),
              },
              {
                path: SitePath.newPassword,
                component: lazy(
                  () => import("./screens/auth/resetPassword/NewPasswordScreen")
                ),
              },
              {
                path: SitePath.resetPasswordSuccess,
                component: lazy(
                  () =>
                    import(
                      "./screens/auth/resetPassword/SuccessResetPasswordScreen"
                    )
                ),
              },
            ],
          },
        ],
      },
      {
        path: SitePath.app,
        component: lazy(() => import("./screens/app/AppWrapper")),
        children: [
          {
            path: "/",
            component: lazy(() => import("./screens/app/home/AppHomeScreen")),
          },
          {
            path: SitePath.circles,
            component: lazy(
              () => import("./screens/app/circles/AppCirclesScreen")
            ),
          },
          {
            path: SitePath.createPost,
            component: lazy(
              () => import("./screens/app/createPost/AppCreatePostScreen")
            ),
          },
          {
            path: SitePath.notifications,
            component: lazy(
              () => import("./screens/app/notifications/AppNotificationsScreen")
            ),
          },
          {
            path: SitePath.messages,
            component: lazy(
              () => import("./screens/app/messages/AppMessagesScreen")
            ),
          },
        ],
      },
      {
        path: "*",
        component: lazy(() => import("./screens/NotFoundScreen")),
      },
    ],
  },
];

const App: Component = () => {
  const Routes = useRoutes(routes);

  return (
    <>
      <Routes />
      <Toaster />
    </>
  );
};

export default App;

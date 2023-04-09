import { RouteDefinition, useRoutes } from "@solidjs/router";
import { Component, createRenderEffect, lazy, onCleanup } from "solid-js";
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
            path: SitePath.signin,
            component: lazy(() => import("./screens/auth/signin/SignInScreen")),
          },
          {
            path: SitePath.signup,
            children: [
              {
                path: "/",
                component: lazy(
                  () => import("./screens/auth/signup/SignUpScreen")
                ),
              },
              {
                path: SitePath.verifySignup,
                component: lazy(
                  () => import("./screens/auth/signup/VerifySignUpScreen")
                ),
              },
              {
                path: SitePath.signupSuccess,
                component: lazy(
                  () => import("./screens/auth/signup/SuccessSignUpScreen")
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

  createRenderEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "f") {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", callback);
    onCleanup(() => window.removeEventListener("keydown", callback));
  });

  createRenderEffect(() => {
    const callback = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.oncontextmenu = callback;
  });

  return (
    <div class="select-none">
      <Routes />
      <Toaster />
    </div>
  );
};

export default App;

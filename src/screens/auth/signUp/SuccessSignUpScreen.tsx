import { useLocation, useNavigate } from "@solidjs/router";
import { createRenderEffect, onCleanup, onMount } from "solid-js";
import Head from "../../../components/head/Head";
import SitePath from "../../../data/sitePath";

export default function SuccessSignUpScreen() {
  const location = useLocation<{ name?: string }>();
  const navigate = useNavigate();

  createRenderEffect(() => {
    if (!location.state?.name) {
      navigate(SitePath.signUpHref, { replace: true });
    }
  });

  onMount(() => {
    const timeout = setTimeout(
      () => navigate(SitePath.signInHref, { replace: true }),
      4000
    );

    onCleanup(() => clearTimeout(timeout));
  });

  return (
    <>
      <Head title="Account verified" />

      <div>
        <div class="w-fit mx-auto font-bold text-3xl">
          <span class="block text-center">Verification Success</span>
        </div>
        <div class="w-fit mx-auto mt-2">
          <span class="block text-center opacity-80">
            Welcome to Mindlop, {location.state?.name}. You will be redirected
            to the sign-in page shortly.
          </span>
        </div>
      </div>
    </>
  );
}

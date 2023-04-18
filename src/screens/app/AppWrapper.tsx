import { Outlet, useNavigate } from "@solidjs/router";
import { createRenderEffect, onCleanup } from "solid-js";
import SitePath from "../../data/sitePath";
import useAuth from "../../hooks/useAuth";

export default function AppWrapper() {
  const navigate = useNavigate();
  const { validateToken } = useAuth();

  createRenderEffect(async () => {
    try {
      const isTokenValid = await validateToken();
      if (isTokenValid) {
        return;
      }
    } catch {}

    navigate(SitePath.signinHref, { replace: true });
  });

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
    onCleanup(() => {
      document.oncontextmenu = null;
    });
  });

  return (
    <div class="select-none">
      <Outlet />
    </div>
  );
}

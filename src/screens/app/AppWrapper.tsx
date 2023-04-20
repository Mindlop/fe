import { A, Outlet, useLocation, useNavigate } from "@solidjs/router";
import { createRenderEffect, createSignal, onCleanup } from "solid-js";
import SitePath from "../../data/sitePath";
import useAuth from "../../hooks/useAuth";
import IconHome from "../../components/icon/IconHome";
import IconPeopleCircle from "../../components/icon/IconPeopleCircle";
import IconAddCircle from "../../components/icon/IconAddCircle";
import IconChatboxEllipses from "../../components/icon/IconChatboxEllipses";
import IconNotifications from "../../components/icon/IconNotifications";

enum BottomNavbar {
  Home,
  Circle,
  CreatePost,
  Notifications,
  Messages,
}

export default function AppWrapper() {
  const location = useLocation();
  const navigate = useNavigate();
  const { validateToken } = useAuth();
  const [activeBottomNavbar, setActiveBottomNavbar] =
    createSignal<BottomNavbar>(BottomNavbar.Home);

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

  createRenderEffect(() => {
    if (location.pathname.startsWith(SitePath.circlesHref)) {
      setActiveBottomNavbar(BottomNavbar.Circle);
    } else if (location.pathname.startsWith(SitePath.createPostHref)) {
      setActiveBottomNavbar(BottomNavbar.CreatePost);
    } else if (location.pathname.startsWith(SitePath.notificationsHref)) {
      setActiveBottomNavbar(BottomNavbar.Notifications);
    } else if (location.pathname.startsWith(SitePath.messagesHref)) {
      setActiveBottomNavbar(BottomNavbar.Messages);
    } else {
      setActiveBottomNavbar(BottomNavbar.Home);
    }
  });

  return (
    <div class="select-none">
      <div class="min-h-screen flex flex-col">
        <div class="flex-1">
          <Outlet />
        </div>
        <div class="p-2 flex justify-around border-t">
          <A href={SitePath.appHref}>
            <IconHome
              iconStyle={
                activeBottomNavbar() === BottomNavbar.Home ? "fill" : "outline"
              }
              class="h-5 w-5"
            />
          </A>
          <A href={SitePath.circlesHref}>
            <IconPeopleCircle
              iconStyle={
                activeBottomNavbar() === BottomNavbar.Circle
                  ? "fill"
                  : "outline"
              }
              class="h-5 w-5"
            />
          </A>
          <A href={SitePath.createPostHref}>
            <IconAddCircle
              iconStyle={
                activeBottomNavbar() === BottomNavbar.CreatePost
                  ? "fill"
                  : "outline"
              }
              class="h-5 w-5"
            />
          </A>
          <A href={SitePath.notificationsHref}>
            <IconNotifications
              iconStyle={
                activeBottomNavbar() === BottomNavbar.Notifications
                  ? "fill"
                  : "outline"
              }
              class="h-5 w-5"
            />
          </A>
          <A href={SitePath.messagesHref}>
            <IconChatboxEllipses
              iconStyle={
                activeBottomNavbar() === BottomNavbar.Messages
                  ? "fill"
                  : "outline"
              }
              class="h-5 w-5"
            />
          </A>
        </div>
      </div>
    </div>
  );
}

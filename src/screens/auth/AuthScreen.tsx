import { Navigate } from "@solidjs/router";
import SitePath from "../../data/sitePath";

export default function AuthScreen() {
  return <Navigate href={SitePath.signinHref} />;
}

import Head from "../components/head/Head";
import Link from "../components/link/Link";
import SitePath from "../data/sitePath";

export default function HomeScreen() {
  return (
    <>
      <Head />
      <div>HomeScreen</div>
      <Link href={SitePath.appHref}>App</Link>
      <Link href={SitePath.signInHref}>Sign in</Link>
      <Link href={SitePath.signUpHref}>Sign up</Link>
    </>
  );
}

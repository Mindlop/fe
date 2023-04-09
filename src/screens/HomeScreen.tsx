import Head from "../components/head/Head";
import Link from "../components/link/Link";
import SitePath from "../data/sitePath";

export default function HomeScreen() {
  return (
    <>
      <Head />
      <div>HomeScreen</div>
      <Link href={SitePath.signinHref}>Sign in</Link>
      <Link href={SitePath.signupHref}>Sign up</Link>
    </>
  );
}

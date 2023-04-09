import { A } from "@solidjs/router";
import { createMemo, JSX } from "solid-js";

interface Props
  extends Omit<JSX.AnchorHTMLAttributes<HTMLAnchorElement>, "state"> {
  href: string;
  replace?: boolean;
  noScroll?: boolean;
  state?: unknown;
  inactiveClass?: string;
  activeClass?: string;
  end?: boolean;
}

export default function Link(props: Props) {
  const mergedProps = createMemo(() => ({
    ...props,
    class: `text-sky-600 hover:underline${
      props.class ? ` ${props.class}` : ""
    }`,
  }));

  return <A {...mergedProps()} />;
}

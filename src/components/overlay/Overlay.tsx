import { JSXElement, createRenderEffect, createSignal } from "solid-js";
import useOverlay from "../../hooks/useOverlay";

export default function Overlay() {
  const overlay = useOverlay();
  const [currentBS, setCurrentBS] = createSignal<JSXElement>();

  createRenderEffect(() => {
    let ov = overlay.get();
    if (ov) {
      setCurrentBS(<ov.component {...ov.props} />);
    } else {
      setCurrentBS();
    }
  });

  return <>{currentBS()}</>;
}

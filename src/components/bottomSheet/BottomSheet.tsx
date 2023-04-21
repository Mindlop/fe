import { JSXElement, createRenderEffect, createSignal } from "solid-js";
import useBottomSheet from "../../hooks/useBottomSheet";

export default function BottomSheet() {
  const bottomSheet = useBottomSheet();
  const [currentBS, setCurrentBS] = createSignal<JSXElement>();

  createRenderEffect(() => {
    let bs = bottomSheet.get();
    if (bs) {
      setCurrentBS(<bs.component {...bs.props} />);
    } else {
      setCurrentBS();
    }
  });

  return <>{currentBS()}</>;
}

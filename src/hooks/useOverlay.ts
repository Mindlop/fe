import { Accessor, JSXElement, Setter, createSignal } from "solid-js";

class OverlayState {
  private static _isInit = false;
  private static _overlayStore: {
    component: (props: any) => JSXElement;
    props: any;
  }[] = [];
  private static _overlay: Accessor<
    | {
        component: (props: any) => JSXElement;
        props: any;
      }
    | undefined
  >;
  private static _setOverlay: Setter<
    | {
        component: (props: any) => JSXElement;
        props: any;
      }
    | undefined
  >;
  private static _overlayCounter: Accessor<number>;
  private static _setOverlayCounter: Setter<number>;

  static init() {
    if (!OverlayState._isInit) {
      OverlayState._isInit = true;
      [OverlayState._overlay, OverlayState._setOverlay] =
        createSignal();
      [
        OverlayState._overlayCounter,
        OverlayState._setOverlayCounter,
      ] = createSignal(0);
    }
  }

  static add(component: (props: any) => JSXElement, props: any) {
    OverlayState._overlayStore.push({ component, props });

    OverlayState._setOverlayCounter(
      OverlayState._overlayStore.length
    );

    OverlayState._setOverlay({ component, props });
  }

  static remove() {
    OverlayState._overlayStore.pop();

    OverlayState._setOverlayCounter(
      OverlayState._overlayStore.length
    );

    if (OverlayState._overlayStore.length > 0) {
      const { component, props } = OverlayState._overlayStore.at(-1)!;
      OverlayState._setOverlay({ component, props });
    } else {
      OverlayState._setOverlay();
    }
  }

  static get count() {
    return OverlayState._overlayCounter;
  }

  static get overlay() {
    return OverlayState._overlay;
  }
}

export default function useOverlay() {
  OverlayState.init();

  return {
    add: OverlayState.add,
    remove: OverlayState.remove,
    count: OverlayState.count,
    get: OverlayState.overlay,
  };
}

import { Accessor, JSXElement, Setter, createSignal } from "solid-js";

class BottomSheetState {
  private static _isInit = false;
  private static _bottomSheetStore: {
    component: (props: any) => JSXElement;
    props: any;
  }[] = [];
  private static _bottomSheet: Accessor<
    | {
        component: (props: any) => JSXElement;
        props: any;
      }
    | undefined
  >;
  private static _setBottomSheet: Setter<
    | {
        component: (props: any) => JSXElement;
        props: any;
      }
    | undefined
  >;
  private static _bottomSheetCounter: Accessor<number>;
  private static _setBottomSheetCounter: Setter<number>;

  static init() {
    if (!BottomSheetState._isInit) {
      BottomSheetState._isInit = true;
      [BottomSheetState._bottomSheet, BottomSheetState._setBottomSheet] =
        createSignal();
      [
        BottomSheetState._bottomSheetCounter,
        BottomSheetState._setBottomSheetCounter,
      ] = createSignal(0);
    }
  }

  static add(component: (props: any) => JSXElement, props: any) {
    BottomSheetState._bottomSheetStore.push({ component, props });

    BottomSheetState._setBottomSheetCounter(
      BottomSheetState._bottomSheetStore.length
    );

    BottomSheetState._setBottomSheet({ component, props });
  }

  static remove() {
    BottomSheetState._bottomSheetStore.pop();

    BottomSheetState._setBottomSheetCounter(
      BottomSheetState._bottomSheetStore.length
    );

    if (BottomSheetState._bottomSheetStore.length > 0) {
      const { component, props } = BottomSheetState._bottomSheetStore.at(-1)!;
      BottomSheetState._setBottomSheet({ component, props });
    } else {
      BottomSheetState._setBottomSheet();
    }
  }

  static get count() {
    return BottomSheetState._bottomSheetCounter;
  }

  static get bottomSheet() {
    return BottomSheetState._bottomSheet;
  }
}

export default function useBottomSheet() {
  BottomSheetState.init();

  return {
    add: BottomSheetState.add,
    remove: BottomSheetState.remove,
    count: BottomSheetState.count,
    get: BottomSheetState.bottomSheet,
  };
}

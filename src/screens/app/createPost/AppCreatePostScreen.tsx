import { useNavigate } from "@solidjs/router";
import Head from "../../../components/head/Head";
import IconArrow from "../../../components/icon/IconArrow";
import PrimaryButton from "../../../components/button/PrimaryButton";
import {
  For,
  JSX,
  JSXElement,
  Match,
  Setter,
  Show,
  Switch,
  createSignal,
  onMount,
} from "solid-js";
import useUser from "../../../hooks/useUser";
import ChipButton from "../../../components/button/ChipButton";
import IconEarth from "../../../components/icon/IconEarth";
import IconPeople from "../../../components/icon/IconPeople";
import IconPeopleCircle from "../../../components/icon/IconPeopleCircle";
import IconCaret from "../../../components/icon/IconCaret";
import useOverlay from "../../../hooks/useOverlay";
import { stopPropagation } from "../../../utils/jsxUtils";
import IconImage from "../../../components/icon/IconImage";
import AnimalAvatar from "../../../components/avatar/AnimalAvatar";
import toast from "solid-toast";
import { createResizeObserver } from "@solid-primitives/resize-observer";
import IconClose from "../../../components/icon/IconClose";

enum AudienceType {
  anyone = "Anyone",
  friends = "Friends",
  circle = "Circle",
}

export default function AppCreatePostScreen() {
  const navigate = useNavigate();
  const userData = useUser();
  const overlay = useOverlay();
  const [audienceType, setAudienceType] = createSignal(AudienceType.anyone);
  const [postCaption, setPostCaption] = createSignal("");
  const [postMedia, setPostMedia] = createSignal<{ file: File; url: string }[]>(
    []
  );

  function addAudienceTypePickerBottomSheet() {
    overlay.add(AudienceTypePickerBottomSheet, {
      audienceType: audienceType(),
      selectAudienceType: setAudienceType,
    });
  }

  function onInputTextArea(
    e: InputEvent & {
      currentTarget: HTMLTextAreaElement;
      target: HTMLTextAreaElement;
    }
  ) {
    setPostCaption(e.currentTarget.value);
  }

  function onChangeMedia(
    e: Event & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) {
    function toastError() {
      toast.error("Maximum of 4 media in one post");
    }

    if (!e.currentTarget.files) return;
    let length = postMedia().length;
    if (length > 4) {
      toastError();
      return;
    }

    let files = Array.from(e.currentTarget.files);

    if (length + files.length > 4) {
      toastError();
      let remainingSpace = 4 - length;
      if (remainingSpace < 0) remainingSpace = 0;
      files = files.slice(0, 4 - length);
    }

    setPostMedia((prev) => [
      ...prev,
      ...files.map((f) => ({
        file: f,
        url: URL.createObjectURL(f),
      })),
    ]);

    e.currentTarget.value = "";
  }

  function removeMedia(index: number) {
    URL.revokeObjectURL(postMedia()[index].url);
    setPostMedia((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  }

  return (
    <>
      <Head title="Create post" />

      <div class="flex-1 flex flex-col">
        <div class="p-1.5 flex items-center justify-between border-b">
          <div class="flex items-center gap-x-2">
            <div onclick={() => navigate(-1)}>
              <IconArrow direction="back" class="w-6 h-6" />
            </div>
            <div>
              <span>Create post</span>
            </div>
          </div>
          <div>
            <PrimaryButton isDisable={!postCaption()}>Post</PrimaryButton>
          </div>
        </div>

        <div>
          <div class="p-2 flex items-center gap-x-2">
            <div>
              <Show
                when={userData.mediaType() === "image"}
                fallback={
                  <Show when={userData.user().id}>
                    <AnimalAvatar
                      seed={userData.user().id}
                      blackout={false}
                      size={48}
                    />
                  </Show>
                }
              >
                <img
                  src={userData.user().media?.url}
                  alt="User profile"
                  class="h-10 w-10 rounded-full object-cover"
                />
              </Show>
            </div>
            <div>
              <div>
                <span class="font-semibold">{userData.user().name}</span>
              </div>
              <div>
                <AudienceChipButton
                  audienceType={audienceType()}
                  onclick={addAudienceTypePickerBottomSheet}
                />
              </div>
            </div>
          </div>
        </div>

        <div class="flex-1 flex flex-col px-2">
          <TextAreaCaption
            oninput={onInputTextArea}
            fullHeight={postMedia().length === 0}
          />

          <Show when={postMedia().length === 1}>
            <div class="relative max-w-sm max-h-[36rem] mt-2 flex items-center rounded-xl overflow-hidden">
              <div
                role="button"
                onclick={() => removeMedia(0)}
                class="absolute top-2 right-2 p-0.5 text-white bg-black/80 rounded-full"
              >
                <IconClose class="w-4 h-4" iconStyle="fill" />
              </div>
              <Switch>
                <Match when={postMedia()[0].file.type.startsWith("image")}>
                  <img
                    src={postMedia()[0].url}
                    alt={postMedia()[0].file.name}
                    class="w-full h-full object-cover"
                  />
                </Match>
              </Switch>
            </div>
          </Show>

          <Show when={postMedia().length > 1}>
            <div class="mt-2 flex gap-x-1 snap-x overflow-x-auto">
              <For each={postMedia()}>
                {(f, index) => (
                  <div class="relative h-32 shrink-0 flex items-center rounded-xl overflow-hidden">
                    <div
                      role="button"
                      onclick={() => removeMedia(index())}
                      class="absolute top-2 right-2 p-0.5 text-white bg-black/80 rounded-full"
                    >
                      <IconClose class="w-4 h-4" iconStyle="fill" />
                    </div>
                    <Switch>
                      <Match when={f.file.type.startsWith("image")}>
                        <img
                          src={f.url}
                          alt={f.file.name}
                          class="w-full min-w-[6rem] max-w-[15rem] h-full object-cover"
                        />
                      </Match>
                    </Switch>
                  </div>
                )}
              </For>
            </div>
          </Show>
        </div>

        <div class="flex items-center gap-x-2 p-2">
          <ButtonMedia
            onchange={onChangeMedia}
            isDisable={postMedia().length >= 4}
          />
        </div>
      </div>
    </>
  );
}

interface AudienceChipButtonProps {
  audienceType: AudienceType;
  onclick: (
    e: MouseEvent & {
      currentTarget: HTMLDivElement;
      target: Element;
    }
  ) => void;
}

function AudienceChipButton(props: AudienceChipButtonProps) {
  return (
    <ChipButton
      onclick={props.onclick}
      prefixComponent={
        <Switch>
          <Match when={props.audienceType === AudienceType.anyone}>
            <IconEarth class="w-4 h-4" />
          </Match>
          <Match when={props.audienceType === AudienceType.friends}>
            <IconPeople class="w-4 h-4" />
          </Match>
          <Match when={props.audienceType === AudienceType.circle}>
            <IconPeopleCircle class="w-4 h-4" />
          </Match>
        </Switch>
      }
      suffixComponent={<IconCaret direction="down" class="w-4 h-4" />}
    >
      {props.audienceType}
    </ChipButton>
  );
}

interface AudiencePickerBottomSheetProps {
  audienceType: AudienceType;
  selectAudienceType: Setter<AudienceType>;
}

function AudienceTypePickerBottomSheet(props: AudiencePickerBottomSheetProps) {
  return (
    <div
      onclick={stopPropagation}
      class="fixed bottom-0 w-full pt-4 rounded-t-3xl bg-white"
    >
      <div>
        <div>
          <span class="block font-bold text-center text-lg">
            Choose audience
          </span>
        </div>
        <div>
          <span class="block text-center text-sm">
            Audiences can see and reply to your post
          </span>
        </div>
      </div>
      <div class="mt-4">
        <AudiencePickerButton
          audienceType={AudienceType.anyone}
          selectAudienceType={props.selectAudienceType}
        />
        <AudiencePickerButton
          audienceType={AudienceType.friends}
          selectAudienceType={props.selectAudienceType}
        />
        <AudiencePickerButton
          audienceType={AudienceType.circle}
          selectAudienceType={props.selectAudienceType}
        />
      </div>
    </div>
  );

  interface AudiencePickerButtonProps {
    audienceType: AudienceType;
    selectAudienceType: Setter<AudienceType>;
  }

  function AudiencePickerButton(props: AudiencePickerButtonProps) {
    const overlay = useOverlay();

    function selectAudienceType() {
      props.selectAudienceType(props.audienceType);
      overlay.remove();
    }

    return (
      <div
        role="button"
        onclick={selectAudienceType}
        class="w-full py-2.5 px-6 flex items-center gap-x-2 text-left active:bg-gray-200"
      >
        <div class="p-2 border rounded-lg">
          <Switch>
            <Match when={props.audienceType === AudienceType.anyone}>
              <IconEarth class="w-6 h-6" />
            </Match>
            <Match when={props.audienceType === AudienceType.friends}>
              <IconPeople class="w-6 h-6" />
            </Match>
            <Match when={props.audienceType === AudienceType.circle}>
              <IconPeopleCircle class="w-6 h-6" />
            </Match>
          </Switch>
        </div>
        <div>{props.audienceType}</div>
      </div>
    );
  }
}

interface TextAreaCaptionProps {
  oninput: (
    e: InputEvent & {
      currentTarget: HTMLTextAreaElement;
      target: HTMLTextAreaElement;
    }
  ) => void;
  fullHeight: boolean;
}

function TextAreaCaption(props: TextAreaCaptionProps) {
  let ref: HTMLTextAreaElement | undefined;

  function resize() {
    if (ref) {
      ref.style.height = "auto";
      ref.style.height = `${ref.scrollHeight}px`;
    }
  }

  onMount(() => {
    createResizeObserver(ref, (_, el) => {
      if (el === ref) {
        if (!props.fullHeight) {
          resize();
        }
      }
    });
  });

  function onInput(
    e: InputEvent & {
      currentTarget: HTMLTextAreaElement;
      target: HTMLTextAreaElement;
    }
  ) {
    if (!props.fullHeight) {
      resize();
    }

    props.oninput(e);
  }

  return (
    <textarea
      ref={ref}
      placeholder="What do you want to talk about?"
      oninput={onInput}
      class="block w-full min-h-fit outline-none text-xl resize-none"
      classList={{
        "flex-1": props.fullHeight,
      }}
    />
  );
}

interface ButtonMediaProps {
  onchange: JSX.ChangeEventHandlerUnion<HTMLInputElement, Event>;
  isDisable?: boolean;
}

function ButtonMedia(props: ButtonMediaProps) {
  let ref: HTMLInputElement | undefined;

  function onClick() {
    if (props.isDisable) return;

    ref?.click();
  }

  return (
    <>
      <input
        ref={ref}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime"
        multiple
        hidden
        onchange={props.onchange}
      />
      <div
        role="button"
        onclick={onClick}
        class="p-2.5 active:bg-gray-200 rounded-full"
        classList={{
          "text-gray-300": props.isDisable,
        }}
      >
        <IconImage class="w-5 h-5" iconStyle="fill" />
      </div>
    </>
  );
}

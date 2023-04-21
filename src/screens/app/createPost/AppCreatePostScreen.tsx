import { useNavigate } from "@solidjs/router";
import Head from "../../../components/head/Head";
import IconArrow from "../../../components/icon/IconArrow";
import PrimaryButton from "../../../components/button/PrimaryButton";
import {
  JSX,
  JSXElement,
  Match,
  Setter,
  Show,
  Switch,
  createSignal,
} from "solid-js";
import useUser from "../../../hooks/useUser";
import ChipButton from "../../../components/button/ChipButton";
import IconEarth from "../../../components/icon/IconEarth";
import IconPeople from "../../../components/icon/IconPeople";
import IconPeopleCircle from "../../../components/icon/IconPeopleCircle";
import IconCaret from "../../../components/icon/IconCaret";
import useBottomSheet from "../../../hooks/useBottomSheet";
import { stopPropagation } from "../../../utils/jsxUtils";
import IconImage from "../../../components/icon/IconImage";
import IconVideocam from "../../../components/icon/IconVideocam";

enum AudienceType {
  anyone = "Anyone",
  friends = "Friends",
  circle = "Circle",
}

export default function AppCreatePostScreen() {
  const navigate = useNavigate();
  const userData = useUser();
  const bottomSheet = useBottomSheet();
  const [audienceType, setAudienceType] = createSignal(AudienceType.anyone);

  function addBottomSheet() {
    bottomSheet.add(AudienceTypePickerBottomSheet, {
      audienceType: audienceType(),
      selectAudienceType: setAudienceType,
    });
  }

  function addImage() {}

  function addVideo() {}

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
            <PrimaryButton>Post</PrimaryButton>
          </div>
        </div>

        <div>
          <div class="p-2 flex items-center gap-x-2">
            <div>
              <Show when={userData.mediaType() === "image"}>
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
                  onclick={addBottomSheet}
                />
              </div>
            </div>
          </div>
        </div>

        <div class="flex-1 flex px-2">
          <textarea
            placeholder="What do you want to talk about?"
            
            class="flex-1 w-full outline-none text-xl resize-none"
          />
        </div>

        <div class="flex items-center gap-x-2 p-2">
          <ButtonMedia onclick={addImage}>
            <IconImage class="w-5 h-5" />
          </ButtonMedia>
          <ButtonMedia onclick={addVideo}>
            <IconVideocam class="w-5 h-5" />
          </ButtonMedia>
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
    const bottomSheet = useBottomSheet();

    function selectAudienceType() {
      props.selectAudienceType(props.audienceType);
      bottomSheet.remove();
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

interface ButtonMediaProps {
  onclick: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent>;
  children: JSXElement;
}

function ButtonMedia(props: ButtonMediaProps) {
  return (
    <div
      role="button"
      onclick={props.onclick}
      class="p-2.5 active:bg-gray-200 rounded-full"
    >
      {props.children}
    </div>
  );
}

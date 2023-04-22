import avatar from "animal-avatar-generator";

interface Props {
  seed: string;
  avatarColors?: string[];
  backgroundColors?: string[];
  blackout?: boolean;
  round?: boolean;
  size?: number;
}

export default function AnimalAvatar(props: Props) {
  const ava = avatar(props.seed, {
    avatarColors: props.avatarColors,
    backgroundColors: props.backgroundColors,
    blackout: props.blackout,
    round: props.round,
    size: props.size,
  });

  return <div innerHTML={ava} />;
}

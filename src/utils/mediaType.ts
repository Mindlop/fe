export default function mediaType(mimeType: string) {
  const mime = mimeType.toLowerCase();
  if (mimeType?.startsWith("image")) {
    return "image";
  } else if (mimeType?.startsWith("video")) {
    return "video";
  } else {
    return "unknown";
  }
}

interface UserT {
  id: string;
  media?: UserMediaT;
  name: string;
  email: string;
  username: string;
  dateOfBirth: string;
  createdAt: string;
  passwordChangedAt: string;
}

interface UserMediaT {
  url: string;
  mimeType?: string;
}

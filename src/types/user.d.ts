interface UserT {
  userAuth: UserAuthT;
  userAccount: UserAccountT;
}

interface UserAuthT {
  userId: string;
  email: string;
  username: string;
  passwordChangedAt: string;
  lastActivityAt: string;
}

interface UserAccountT {
  userId: string;
  name: string;
  media?: UserAccountMediaT;
  dateOfBirth: string;
  friendsCount: string;
  createdAt: string;
}

interface UserAccountMediaT {
  url: string;
  mimeType?: string;
}

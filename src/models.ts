export interface User {
  id: string;
  name: string;
  email: string;
  profile: string;
}

export type FetchProfileResponse = {
  id: User['id'];
  name: User['name'];
  email: User['email'];
  profile: User['profile'];
};

export type FetchUsersResponse = {
  id: User['id'];
  name: User['name'];
  email: User['email'];
  profile: User['profile'];
}[];

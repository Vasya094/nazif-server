import { User } from 'src/users/users.model';

export function getShortenedUsersInfo(users: User[]) {
  return users.map((user) => {
    return getShortenedUserInfo(user);
  });
}

export function getShortenedUserInfo(user: User) {
  const { email, name, id } = user;
  return {
    email,
    name,
    id,
    roles: getShortenedRoles(user),
  };
}

export function getShortenedRoles(user: User) {
  const roles = user?.roles;
  return roles || [];
}

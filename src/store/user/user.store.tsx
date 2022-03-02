import { action, observable } from "mobx";
import { forkJoin, map, take } from "rxjs";
import { ProjectIds } from "../../models/project-ids.interface";
import { UserState } from "../../models/user-state.interface";
import { User } from "../../models/user.interface";
import { userService } from "../../services/user.service";

const initialState: UserState = {
  users: [],
  isGettingUsers: false,
  error: null,
};

export const UserStore = observable({
  ...initialState,
  setUsers: action(() => {
    UserStore.isGettingUsers = true;
    forkJoin({
      registeredUsers: userService.getRegisteredUsers(),
      unregisteredUsers: userService.getUnregisteredUsers(),
      projectMemberships: userService.getProjectMemberships(),
    })
      .pipe(
        take(1),
        map(({ registeredUsers, unregisteredUsers, projectMemberships }) => {
          registeredUsers = registeredUsers?.map((user: User) => ({
            ...user,
            registered: true,
          }));
          unregisteredUsers = unregisteredUsers?.map((user: User) => ({
            ...user,
            registered: false,
          }));
          const combinedUserList = [
            ...registeredUsers,
            ...unregisteredUsers,
          ].map((user) => ({
            ...user,
            projectIds: projectMemberships
              .filter((project: ProjectIds) => project.userId === user.id)
              .map((project: ProjectIds) => project.projectId),
          }));
          return combinedUserList;
        })
      )
      .subscribe(
        (userList: User[]) => {
          UserStore.setUsersSuccess(userList);
        },
        (error) => UserStore.setUsersFailure(error)
      );
  }),
  setUsersSuccess: action((users: User[]) => {
    UserStore.users = users;
    UserStore.isGettingUsers = false;
  }),
  setUsersFailure: action((error: any) => {
    UserStore.error = error;
    UserStore.isGettingUsers = false;
  }),
});

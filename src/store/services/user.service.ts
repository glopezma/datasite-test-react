import { from } from "rxjs";
import axios from "axios";

export default class UserService {
  private baseUrl: string = "https://5c3ce12c29429300143fe570.mockapi.io/api";
  getRegisteredUsers() {
    let response = axios(`${this.baseUrl}/registeredusers`).then(
      (res) => res.data
    );
    return from(response);
  }

  getUnregisteredUsers() {
    let response = axios(`${this.baseUrl}/unregisteredusers`).then(
      (res) => res.data
    );
    return from(response);
  }

  getProjectMemberships() {
    let response = axios(`${this.baseUrl}/projectmemberships`).then(
      (res) => res.data
    );
    return from(response);
  }
}

export const userService = new UserService();

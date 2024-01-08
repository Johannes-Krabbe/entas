import { ERRORS, ServiceError } from "../../types/error.types";

export function createUser() {
  throw new ServiceError(ERRORS.USERNAME_TAKEN({ username: "johannes" }));
}

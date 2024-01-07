export class ServiceError extends Error {
  public error: PublicJsonError;

  constructor(error: PublicJsonError) {
    super(error.message);
    this.error = error;
  }
}

interface PublicJsonError {
  error: boolean;
  message: string;
  code: string;
}

export const ERRORS = {
  SOMETHING_WENT_WRONG: {
    error: true,
    message: `Something went wrong :(`,
    code: "entas_0000",
  },

  USERNAME_TAKEN: (input: UsernameTakenInput) => {
    return {
      error: true,
      message: `Username "${input.username}" is already taken`,
      code: "entas_0001",
    };
  },
};

type UsernameTakenInput = {
  username: string;
};

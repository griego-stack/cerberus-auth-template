export interface CreateUserAccountDTO {
  metadata: {
    redirectURL?: string;
  };
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

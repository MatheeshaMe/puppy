export interface LoginDTO {
  name: string;
  password: string;
}

export interface RegisterDTO {
  name: string;
  address: string;
  photo: string;
  accounts: string;
  password: string;
  isAdmin: boolean;
}

export enum Role {
  SHOP = "SHOP",
  ADMIN = "ADMIN",
  WRITER = "WRITER",
  EDITOR = "EDITOR",
}

export interface Shop {
  email: string;
  password: string;
  name: string;
  roles?: Role[];
}

export interface User {
  id: string;
  email: string;
  userName: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

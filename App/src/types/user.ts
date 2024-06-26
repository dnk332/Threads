export interface UserI {
  username: string;
  avatar: string;
  user_id: number;
  is_frozen: boolean;
  password_changed_at: string;
  created_at: string;
}

export interface UserProfileI {
  name: string;
  email: string;
  bio: string;
}

export interface IsMessage {
  id: number;
  user_id: number;
  user_name: string;
  photo_url: string;
  created_at: string;
  msg: {
    content: string;
    mType: string;
  };
}

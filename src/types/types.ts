//데이터 구조 커스텀
export interface IsCustomMessage {
  date: string;
  messages: IsMessage[];
}

export interface IsMessage {
  id: number;
  user_id: number;
  user_name: string;
  photo_url: string;
  created_at: any;
  msg: {
    content: string;
    mtype: string;
  };
}

export interface IMypageUIProps {
  posts: any[];
  currentUser: {
    name: string;
    username: string;
    users_id: number;
  };
  onClickNextPage: () => void;
  onClickPrevPage: () => void;
}
export interface IMypageListUIProps {
  posts: any[];
}

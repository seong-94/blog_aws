import { ChangeEvent, MouseEvent } from "react";

export interface ICommentWriteProps {
  postId: string;
  desc: string;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  onClickCancle: (event: MouseEvent<HTMLButtonElement>) => void;
  onChangeContents: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onHandleSubmit: (event: MouseEvent<HTMLButtonElement>) => Promise<void>;
}

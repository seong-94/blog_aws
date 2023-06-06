import { ChangeEvent, MouseEvent } from "react";

export interface IWriteUIProps {
  onClickCategory: (event: MouseEvent<HTMLDivElement>) => void;
  onChangeContents: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClick: (event: MouseEvent<HTMLButtonElement>) => Promise<void>;
  onClickDropCategory: () => void;
  dropCat: boolean;
  title: string;
  contents: string;
  state: object;
  cat: string;
}

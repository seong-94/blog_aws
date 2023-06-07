import { MouseEvent, ChangeEvent } from "react";

export interface ILoginUIProps {
  handleSubmit: (event: MouseEvent<HTMLButtonElement>) => Promise<void>;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  err: string;
}

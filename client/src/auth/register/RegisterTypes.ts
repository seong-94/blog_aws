import { MouseEvent, ChangeEvent } from "react";

export interface IRegisterUIProps {
  handleSubmit: (event: MouseEvent<HTMLButtonElement>) => Promise<void>;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

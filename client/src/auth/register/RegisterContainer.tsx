import { ChangeEvent, useState, MouseEvent } from "react";
//react router
import { useNavigate } from "react-router-dom";
//scss
// axios
import axios from "axios";
import RegisterPresenter from "./RegisterPresenter";
//react toastify

export default function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  // const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (
    event: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      alert("회원가입에 성공하였습니다.");
      navigate("/login");
    } catch (err: any) {
      alert(err.response.data);
    }
  };

  return (
    <>
      <RegisterPresenter
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </>
  );
}

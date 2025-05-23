import { useState } from "react";
import { userLogin, userRegister } from "../lib/authApi";
import { useNavigate } from "react-router-dom";

function Login() {
  const [currencyState, setCurrencyState] = useState("Login");

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const LoginHandler = async () => {
    try {
      const response = await userLogin(form.email, form.password);
      navigate("/");
      setForm({
        name: "",
        email: "",
        password: "",
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const SignUpHandler = async () => {
    try {
      const response = await userRegister(form.name, form.email, form.password);
      setForm({
        name: "",
        email: "",
        password: "",
      });
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const SubmitHandler = async (event) => {
    event.preventDefault();
    if (currencyState === "Login") {
      LoginHandler();
    } else {
      SignUpHandler();
    }
  };

  return (
    <form
      onSubmit={SubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currencyState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currencyState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          value={form.name}
          required
        />
      )}
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        value={form.email}
        required
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        value={form.password}
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forget your password?</p>
        {currencyState === "Login" ? (
          <button
            className="cursor-pointer"
            onClick={() => setCurrencyState("SignUp")}
          >
            Create Account
          </button>
        ) : (
          <button
            onClick={() => setCurrencyState("Login")}
            className="cursor-pointer"
          >
            Back to Login
          </button>
        )}
      </div>

      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currencyState === "Login" ? "Sign in" : "Sign Up"}
      </button>
    </form>
  );
}

export default Login;
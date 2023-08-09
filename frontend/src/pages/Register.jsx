import { Link, useNavigate } from "react-router-dom";
import SideRegisterImage from "../assets/Notes-pana.svg";
import { axiosLocal } from "../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import actions from "../reducer/actions";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/note.png";
import { FcGoogle } from "react-icons/fc";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    isError && toast.error(message);
    (isSuccess || user) && navigate("/");
    dispatch({ type: actions.RESET });
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      if (!email || !name || !password) toast.error("Please Enter All Fields");

      try {
        const register = async () => {
          const response = await axiosLocal.post("/user/register", userData);
          if (response.data) {
            userData.token = response.data.token;
            localStorage.setItem("user", JSON.stringify(response.data));
            dispatch({ type: actions.AUTHENTICATED, user: userData });
          } else {
            dispatch({ type: actions.AUTHERROR, message: response.data });
          }
          navigate("/");
          return response.data;
        };
        register();
      } catch (error) {
        toast.success(error.message);
      }
    }
  };

  return (
    <div className="h-full bg-[#e9e9e9] text-black flex items-center justify-between text-sm md:text-md">
      <ToastContainer
        className={"text-sm"}
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex flex-row h-full w-full items-center md:justify-between justify-center">
        <div className="basis-auto hidden w-min-[300px] sm:block md:w-5/12 lg:w-6/12 bg-[url('./assets/bg-login.jpg')] h-full w-full flex-1 bg-center bg-cover bg-no-repeat">
          {/* <img
            src={SideLoginImage}
            className="p-0 bg-cover bg-no-repeat h-screen"
            alt="Side Register Image"
          /> */}
        </div>

        <div className="h-full flex items-center justify-center min-w-[350px]  bg-[#ffffff] shadow border-neutral-300 border w-10/12 md:w-5/12 lg:w-5/12 xl:w-5/12 relative">
          <div className="flex px-3 py-2 rounded-lg mx-1 mt-1 absolute top-0 left-0">
            <span className="dark:ring-slate-700 ring-slate-400 ring-2 p-1 rounded-full h-10 w-10 justify-center">
              <img src={logo} className="h-8 w-8" />
            </span>
            <h1 className="text-[1.2rem] md:text-[1.4rem] font-kalam font-semibold text-slate-700 px-4 pt-2 relative">
              Word Search Dictionary
              <span className="font font-poppins absolute text-[0.6rem] bottom-0 right-0 -translate-x-6 translate-y-2">
                -- Developed by Shrikant
              </span>
            </h1>
          </div>

          <form onSubmit={onSubmit} className="p-10 w-full max-w-[500px] mt-10">
            <div className="flex flex-row items-center justify-center lg:justify-start pb-6">
              <p className="mb-0 mr-4 text-lg font-semibold">
                Create your account
              </p>
            </div>

            <button
              type="button"
              className="relative mb-6 border-stone-400 peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none items-center justify-center flex"
            >
              <FcGoogle className="h-5 w-5 mr-2"></FcGoogle> Log in with Google
            </button>

            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-700 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-700">
              <p className="mx-4 mb-0 text-center font-semibold dark:text-slate-800">
                Or
              </p>
            </div>

            <div className="relative mb-6">
              <input
                type="text"
                className="border-stone-400 peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none bg-white text-black"
                // id="exampleFormControlInput2"
                // placeholder="Name"
                id="name"
                name="name"
                value={name}
                onChange={onChange}
              />
              <label
                // for="exampleFormControlInput2"
                className={`pointer-events-none px-1 absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-600 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary  motion-reduce:transition-none peer-focus:bg-white peer-focus:text-black ${
                  name.length &&
                  "scale-[0.8] -translate-y-[1.15rem] bg-white text-black"
                }`}
              >
                Name
              </label>
            </div>
            <div className="relative mb-6" data-te-input-wrapper-init>
              <input
                type="text"
                className="border-stone-400 peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none"
                // id="exampleFormControlInput2"
                // placeholder="Email address"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
              />
              <label
                // for="exampleFormControlInput2"
                className={`pointer-events-none px-1 absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-600 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none peer-focus:bg-white peer-focus:text-black ${
                  email.length &&
                  "scale-[0.8] -translate-y-[1.15rem] bg-white text-black"
                }`}
              >
                Email address
              </label>
            </div>

            <div className="relative mb-6" data-te-input-wrapper-init>
              <input
                type="password"
                className="border-stone-400 peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200"
                // id="exampleFormControlInput22"
                // placeholder="Password"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
              />
              <label
                // for="exampleFormControlInput22"
                className={`pointer-events-none px-1 absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-600 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary motion-reduce:transition-none peer-focus:bg-white peer-focus:text-black ${
                  password.length &&
                  "scale-[0.8] -translate-y-[1.15rem] bg-white text-black"
                }`}
              >
                Password
              </label>
            </div>

            <div className="relative mb-6" data-te-input-wrapper-init>
              <input
                type="password"
                className="border-stone-400 peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200"
                // id="exampleFormControlInput22"
                // placeholder="Confirm Password"
                id="passwaord2"
                name="password2"
                value={password2}
                onChange={onChange}
              />
              <label
                // for="exampleFormControlInput22"
                className={`pointer-events-none px-1 absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-600 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary  motion-reduce:transition-none peer-focus:bg-white peer-focus:text-black ${
                  password2.length &&
                  "scale-[0.8] -translate-y-[1.15rem] bg-white text-black"
                }`}
              >
                Confirm Password
              </label>
            </div>

            <div className="mb-6 flex items-center">
              <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                <input
                  className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-[#0ab134] checked:bg-[#0ab134] checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
                  type="checkbox"
                  value=""
                  id="exampleCheck2"
                />
                <label
                  className="inline-block pl-[0.15rem] hover:cursor-pointer"
                  // for="exampleCheck2"
                >
                  {"I accept the "}
                  <a className="text-[#4860da]">Terms and Conditions</a>
                </label>
              </div>
            </div>

            <div className="text-center lg:text-left">
              <button
                className="inline-block bg-[#1463c2] hover:bg-[#4b8dde] rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
                type="submit"
              >
                Sign Up
              </button>

              <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                Already have an account? &nbsp;
                <Link
                  to="/login"
                  className="text-[#b63e3e] transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700 hover:text-[#e81414]"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthImage from "../../assets/images/Auth_Image.png";
import Icon from "../../assets/icons/comp_icon.png";

// local
import useLoginReg from "../hooks/useLoginReg";
// variables
const initialFormState = {
    email: ``,
    password: ``,
};

const LoginForm = () => {
    const navigate = useNavigate();
    const [formState, setFormState] = useState(initialFormState);
    const { loginReg } = useLoginReg();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevUserValue) => ({ ...prevUserValue, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginReg(`/login`, formState);
            setFormState(initialFormState);
            navigate(`/`);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <div className="flex shadow-2xl max-w-lg rounded-xl">
                <img
                    className="rounded-tl-3xl rounded-bl-3xl"
                    src={AuthImage}
                    alt="Adventurers playing dnd"
                />
                <form
                    onSubmit={handleSubmit}
                    className="content-center p-16 rounded-tr-3xl rounded-br-3xl bg-white">
                    <div className="flex justify-center">
                        <img
                            className="max-w-16 rounded-full "
                            src={Icon}
                            alt="D20 Icon"
                        />
                    </div>
                    <div className="flex justify-center pt-8">
                        <div className="min-w-full">
                            <div className="pb-8">
                                <h1 className="text-4xl text-black text-center text-nowrap">
                                    Welcome Back!
                                </h1>
                                <h2 className="text-xs text-center text-black">
                                    Please enter your credentials
                                </h2>
                            </div>
                            <label htmlFor="email" className="flex">
                                <input
                                    className="border-b border-black bg-white grow mb-4"
                                    placeholder="Email"
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formState.email}
                                    onChange={(e) => handleChange(e)}
                                />
                            </label>
                            <label htmlFor="password" className="flex mb-8">
                                <input
                                    className="border-b bg-white border-black grow"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    id="password"
                                    value={formState.password}
                                    onChange={(e) => handleChange(e)}
                                />
                            </label>
                            <button className="btn btn-block rounded-full bg-[#231D24]  text-white">
                                Log In
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
export default LoginForm;

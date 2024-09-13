import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthImage from "../../assets/images/Auth_Image.png";
import Icon from "../../assets/icons/comp_icon.png";
// Import Local
import useLoginReg from "../hooks/useLoginReg";
// Variables
const initialFormState = {
    firstName: ``,
    lastName: ``,
    email: ``,
    password: ``,
    confirmPassword: ``,
};

const RegisterForm = () => {
    const navigate = useNavigate();
    const [formState, setFormState] = useState(initialFormState);
    const { loginReg, errors, isLoading } = useLoginReg();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevUserValue) => ({ ...prevUserValue, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginReg(`/register`, formState);
            setFormState(initialFormState);
            navigate(`/`);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <div className="flex shadow-2xl max-w-lg rounded-xl container size-auto">
                <img
                    className="rounded-tl-3xl rounded-bl-3xl w-full h-auto object-cover
                    "
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
                            <label htmlFor="firstName" className="flex ">
                                <input
                                    type="text"
                                    className="border-b border-black bg-white grow mb-4"
                                    name="firstName"
                                    placeholder="First Name"
                                    id="firstName"
                                    value={formState.firstName}
                                    onChange={(e) => handleChange(e)}
                                />
                            </label>
                            <label htmlFor="lastName" className="flex">
                                <input
                                    type="text"
                                    name="lastName"
                                    className="border-b border-black bg-white grow mb-4"
                                    placeholder="Last Name"
                                    id="lastName"
                                    value={formState.lastName}
                                    onChange={(e) => handleChange(e)}
                                />
                            </label>
                            <label htmlFor="email" className="flex">
                                <input
                                    type="email"
                                    name="email"
                                    className="border-b border-black bg-white grow mb-4"
                                    placeholder="Email"
                                    id="email"
                                    value={formState.email}
                                    onChange={(e) => handleChange(e)}
                                />
                            </label>
                            <label htmlFor="password" className="flex">
                                <input
                                    type="password"
                                    name="password"
                                    className="border-b border-black bg-white grow mb-4"
                                    placeholder="Password"
                                    id="password"
                                    value={formState.password}
                                    onChange={(e) => handleChange(e)}
                                />
                            </label>
                            <label htmlFor="confirmPassword" className="flex">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="border-b border-black bg-white grow mb-16"
                                    placeholder="Confirm Password"
                                    id="confirmPassword"
                                    value={formState.confirmPassword}
                                    onChange={(e) => handleChange(e)}
                                />
                            </label>
                            <button className="btn btn-block rounded-full bg-[#231D24]  text-white">
                                Register
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
export default RegisterForm;

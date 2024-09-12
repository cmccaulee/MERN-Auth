import { callLoginReg } from "../service/userService";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function useLoginReg() {
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useContext(AuthContext);

    const loginReg = async (path, formData) => {
        setIsLoading(true)
        try {
            setErrors(null)
            // Call api with URI and data
            const user = await callLoginReg(path, formData)

            // Store user name and token in local storage
            localStorage.setItem('user', JSON.stringify(user))

            // update global state
            dispatch({ type: 'LOGIN', payload: user })

            // Done Loading, set to false
            setIsLoading(false)
        } catch (err) {

            // catch any API errors
            setErrors(err?.response?.data?.errors)
            // done loading, set to false. 
            setIsLoading(false)
            // Throw error to trigger catch
            throw err
        }
    }
    return { loginReg, errors, isLoading }
}
export default useLoginReg;
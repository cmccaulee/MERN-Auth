import { useNavigate, Link } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const button = () => {
        {
            user ? console.log(user) : console.log("No user logged in");
        }
    };
    const logout = () => {
        localStorage.removeItem("user");
        navigate(0);
        console.log("logged out");
    };

    return (
        <>
            <div className="grid grid-cols-12 grid-rows-4">
                <div className="col-span-4 col-start-5 row-start-3">
                    {user ? (
                        <h1 className="text-2xl text-center pb-8">
                            Welcome Home, {user.firstName}{" "}
                        </h1>
                    ) : (
                        <h1 className="text-2xl text-center pb-8">
                            Welcome! Please login.
                        </h1>
                    )}

                    <div className="flex justify-center gap-4">
                        <button
                            className="btn btn-primary min-w-28"
                            onClick={button}>
                            Current User
                        </button>
                        <button
                            onClick={logout}
                            className="btn btn-primary min-w-28">
                            Log Out
                        </button>
                        <Link to="/login" className="btn btn-primary min-w-28">
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="btn btn-primary min-w-28">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Home;

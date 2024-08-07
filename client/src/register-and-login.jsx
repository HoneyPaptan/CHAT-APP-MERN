import {useContext, useState} from "react";
import axios from "axios";
import { toast } from "sonner";
import { UserContext } from "./context/userContext";

export default function RegisterAndLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginOrRegister, setIsLoginOrRegister] = useState("register");
    // grabbing the global state
    const {setUser , setId} = useContext(UserContext);

    const handleRegister = async (e) => {
        e.preventDefault();
        const url = isLoginOrRegister === "login" ? "/login" : "/register";
        const promise = axios.post(url, { username, password });

        toast.promise(promise, {
            loading: 'Loading...',
            success: `${isLoginOrRegister === "login" ? "Logged in " : "Registered"}successfully`,
            error: (err) => `Error: ${err.response.data}`,
        });

        try {
            const {data} = await promise;
            setUser(username);
            setId(data.id);

            console.log(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleToggle = (e) => {
        e.preventDefault();
        setIsLoginOrRegister(isLoginOrRegister === "login" ? "register" : "login");
    };

    return (
        <div className="bg-black/95 h-screen flex items-center">
            <form className="w-64 mx-auto mb-12" onSubmit={handleRegister}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username"
                    className="block w-full rounded-sm p-2 mb-2 border"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    className="block w-full rounded-sm p-2 mb-2 border"
                />
                <button className="bg-lime-500 text-black block w-full rounded-sm p-2">
                    {isLoginOrRegister === "login" ? "Login" : "Register"}
                </button>
                <div className="text-center mt-2 text-white text-sm">
                    {isLoginOrRegister === "login" ? (
                        <>
                            New to MessageMe?{" "}
                            <button onClick={handleToggle} className="text-lime-500 underline">
                                Register Here
                            </button>
                        </>
                    ) : (
                        <>
                            Already a member?{" "}
                            <button onClick={handleToggle} className="text-lime-500 underline">
                                Login Here
                            </button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}

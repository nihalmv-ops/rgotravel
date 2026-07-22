import "./Login.css";

import { useState } from "react";

import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

import { Link } from "react-router-dom";


function Login(){

    const [showPassword,setShowPassword] = useState(false);


    return(

        <section className="login-page">


            <div className="login-box">


                <h1>
                    Welcome Back
                </h1>


                <p>
                    Login to continue your journey with GoTravel
                </p>



                <form className="login-form">


                    <div className="input-box">

                        <FaEnvelope/>

                        <input
                            type="email"
                            placeholder="Email Address"
                        />

                    </div>



                    <div className="input-box">


                        <FaLock/>


                        <input
                            type={
                                showPassword
                                ? "text"
                                : "password"
                            }
                            placeholder="Password"
                        />


                        <span
                        onClick={()=>
                            setShowPassword(!showPassword)
                        }
                        >

                        {
                            showPassword
                            ?
                            <FaEyeSlash/>
                            :
                            <FaEye/>
                        }

                        </span>


                    </div>



                    <button>
                        Login
                    </button>



                </form>



                <div className="login-bottom">


                    <p>
                        Don't have an account?
                    </p>


                    <Link to="/register">
                        Create Account
                    </Link>


                </div>


            </div>


        </section>


    );

}


export default Login;
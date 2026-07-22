import "./Register.css";

import { useState } from "react";

import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

import { Link } from "react-router-dom";


function Register(){

    const [showPassword,setShowPassword] = useState(false);


    return(

        <section className="register-page">


            <div className="register-box">


                <h1>
                    Create Account
                </h1>


                <p>
                    Join GoTravel and start your adventure
                </p>



                <form className="register-form">


                    <div className="input-box">

                        <FaUser/>

                        <input
                            type="text"
                            placeholder="Full Name"
                        />

                    </div>



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
                                ?
                                "text"
                                :
                                "password"
                            }
                            placeholder="Password"
                        />


                        <span
                        onClick={() =>
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



                    <div className="input-box">

                        <FaLock/>

                        <input
                            type="password"
                            placeholder="Confirm Password"
                        />

                    </div>



                    <button>

                        Create Account

                    </button>



                </form>



                <div className="register-bottom">

                    <p>
                        Already have an account?
                    </p>


                    <Link to="/login">

                        Login

                    </Link>


                </div>



            </div>


        </section>


    );

}


export default Register;
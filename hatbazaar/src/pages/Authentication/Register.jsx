import React from 'react'
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
// import { AuthContext } from "../provider/AuthProvider";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AuthContext } from '../../provider/AuthProvider';
// import { toast } from 'react-toastify';
// import { Helmet } from "react-helmet";
export default function Register() {
    const [logStatus, setLogStatus] = useState('')
    const [passInfo, setPassInfo] = useState(null)
    const [passStatus, setPassStatus] = useState(false)
    const [focus, setTheFocus] = useState(false)
    const { createUser, githubAuthentication, googleAuthentication } = useContext(AuthContext)

    const {
        register,
        handleSubmit,
        resetField,
        formState: { errors },
    } = useForm();

    const handleGithubSignUp = () => {
        githubAuthentication()
            .then(res => console.log(res))
    }
    const handleGoogleSignUp = () => {
        googleAuthentication()
            .then(res => console.log(res))
    }
    const handleCreateUser = (data) => {
        const { name, email, photoUrl, password } = data
        createUser(email, password)
            .then(res => console.log(res))
            .catch(error => console.log(error))
    }
    return (
        <div>
            <div className="w-full lg:max-w-lg mx-auto animate__animated animate__fadeIn px-4 lg:px-0 mt-12 lg:mt-28">
                {/* <Helmet>
                    <title>BDCorporate | Register</title>
                </Helmet> */}
                <div className="flex items-center justify-center h-auto lg:h-[calc(100dvh-90px)] ">
                    <div className="flex flex-col items-center font-poppins w-full lg:pb-12">
                        <div className="space-y-7 flex items-center flex-col w-full">
                            <h1 className="text-black text-3xl font-semibold">Sign up</h1>
                            <p className="text-black text-center text-sm">Sign up to access your account</p>
                            <p className="font-bold text-center animate__animated animate__flipInX">{logStatus}</p>
                            <div className="flex gap-5 w-full">
                                <button onClick={handleGithubSignUp} className="btn flex-1 rounded-none">
                                    <img className="h-6 w-6" src="github-mark.svg" alt="" />
                                    <span className="text-black font-medium font-base">GitHub</span>
                                </button>
                                <button onClick={handleGoogleSignUp} className="btn flex-1 rounded-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M23.52 12.2729C23.52 11.422 23.4436 10.6038 23.3018 9.81836H12V14.4602H18.4582C18.18 15.9602 17.3345 17.2311 16.0636 18.082V21.0929H19.9418C22.2109 19.0038 23.52 15.9274 23.52 12.2729Z" fill="#4285F4" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 23.9998C15.24 23.9998 17.9564 22.9252 19.9418 21.0925L16.0636 18.0816C14.9891 18.8016 13.6145 19.2271 12 19.2271C8.87455 19.2271 6.22909 17.1161 5.28546 14.2798H1.27637V17.3889C3.25091 21.3107 7.30909 23.9998 12 23.9998Z" fill="#34A853" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.28545 14.2799C5.04545 13.5599 4.90909 12.7908 4.90909 11.9999C4.90909 11.209 5.04545 10.4399 5.28545 9.71993V6.61084H1.27636C0.463636 8.23084 0 10.0636 0 11.9999C0 13.9363 0.463636 15.769 1.27636 17.389L5.28545 14.2799Z" fill="#FBBC05" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 4.77273C13.7618 4.77273 15.3436 5.37818 16.5873 6.56727L20.0291 3.12545C17.9509 1.18909 15.2345 0 12 0C7.30909 0 3.25091 2.68909 1.27637 6.61091L5.28546 9.72C6.22909 6.88364 8.87455 4.77273 12 4.77273Z" fill="#EA4335" />
                                    </svg>
                                    <span className="text-black font-medium font-base rounded-none">Google</span>
                                </button>
                            </div>
                            <div className="w-full">
                                <div className="relative flex py-4 items-center">
                                    <div className="flex-grow border-t-2 border-[#E0E5EC] rounded-full"></div>
                                    <span className="flex-shrink mx-3 text-sm text-[#262626]">Or</span>
                                    <div className="flex-grow border-t-2 border-[#E0E5EC] rounded-none-full"></div>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit(handleCreateUser)} className="space-y-4 w-full">
                                <div className="mb-8 flex flex-col gap-4">
                                    <div className="w-full">
                                        <input {...register('name')} type="text" placeholder="Your name here" className="input bg-[#F5F9FE] w-full p-7 rounded-none" />
                                    </div>
                                    <div className="w-full">
                                        <input {...register('email')} type="email" placeholder="Your email here" className="input bg-[#F5F9FE] w-full p-7 rounded-none" />
                                    </div>
                                    <div className="w-full">
                                        <input {...register('photoUrl')} type="text" placeholder="Your photo url here" className="input bg-[#F5F9FE] w-full p-7 rounded-none" />
                                    </div>
                                    <div className="w-full space-y-2">
                                        <label className={`input flex items-center gap-2 bg-[#F5F9FE] p-7 rounded-none ${focus ? "animate__animated animate__shakeX" : ""}`}>
                                            <input onFocus={() => setTheFocus(false)} onKeyUp={(e) => checkPass(e.target.value)} {...register('password')} type={passStatus ? "text" : "password"} className={`grow w-full`} placeholder="••••••••" />
                                            {

                                                passStatus ? <FaRegEye className="text-2xl hover:cursor-pointer animate__animated animate__fadeIn" onClick={() => setPassStatus(!passStatus)} /> : <FaRegEyeSlash className="text-2xl hover:cursor-pointer" onClick={() => setPassStatus(!passStatus)} />

                                            }
                                        </label>
                                        {passInfo && <span className={`font-semibold text-sm flex justify-end animate__animated animate__headShake ${passInfo === 'Valid' ? "text-green-600" : "text-[#EB6753]"}`}>{passInfo}</span>}
                                    </div>
                                </div>
                                <div className="w-full">
                                    <button type="submit" className="hover:cursor-pointer w-full relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-black text-white hover:bg-black group">
                                        <span className="w-48 h-48 rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                                        <span className="text-center relative w-full transition-colors duration-300 ease-in-out text-white group-hover:text-white">Sign up</span>
                                    </button>
                                </div>
                                <p className="text-sm">Already have account? <Link to="/login" className="text-[#3461FD]">Login</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

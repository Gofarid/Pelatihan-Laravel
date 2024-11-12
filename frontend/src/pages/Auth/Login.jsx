import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Cookies from 'js-cookie';
import axios from 'axios';
import React from "react";

export default function Login() { 
    const [backendErrors, setBackendErrors] = React.useState({});

    const formik = useFormik({ 
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yup.object({
            email: yup.string()
                .email('Alamat email tidak valid')
                .required('Email wajib diisi'),
            password: yup.string()
                .min(6, 'Password harus terdiri dari minimal 6 karakter')
                .max(15, 'Password dapat terdiri dari maksimal 15 karakter')
                .required('Password wajib diisi'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/auth/login', values);
                const { id } = response.data.data;
                const token = response.data.token
                Cookies.set('id', id, { expires: 7, secure: true });
                Cookies.set('token', token, { expires: 7, secure: true });
                
                window.location.replace('/products');
            } catch (error) {
                console.error('Login failed:', error);
                if (error.response && error.response.data.errors) {
                    const formattedErrors = error.response.data.errors.reduce((acc, err) => {
                        acc[err.path] = err.msg;
                        return acc;
                    }, {});
                    setBackendErrors(formattedErrors);
                }
            }
        },
    });

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                    Masukkan Data Diri Kamu Ya!
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                            Email Address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                placeholder="Masukkan Email Kamu"
                                type="email"
                                autoComplete="email"
                                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm ${formik.errors.email ? 'border-red-600' : ''}`}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.email ? (
                                <span className="text-red-600">{formik.errors.email}</span>
                            ) : backendErrors.email ? (
                                <span className="text-red-600">{backendErrors.email}</span>
                            ) : null}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <Link to="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Lupa password?
                                </Link>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                placeholder="Masukkan Password Kamu"
                                type="password"
                                autoComplete="current-password"
                                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm ${formik.errors.password ? 'border-red-600' : ''}`}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.password ? (
                                <span className="text-red-600">{formik.errors.password}</span>
                            ) : backendErrors.password ? (
                                <span className="text-red-600">{backendErrors.password}</span>
                            ) : null}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button> 
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Belum Terdaftar? 
                    <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Daftar Dulu Yuk
                    </Link>
                </p>
            </div>
        </div>
    );
}

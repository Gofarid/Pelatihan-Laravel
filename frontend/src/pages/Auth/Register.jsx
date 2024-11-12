import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import React from "react";

export default function Register() {
    const [backendErrors, setBackendErrors] = React.useState({});
    const navigate = useNavigate(); // Inisialisasi useNavigate

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: yup.object({
            name: yup.string().required('Nama wajib diisi'),
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
                await axios.post('http://127.0.0.1:8000/api/auth/register', values);
                navigate('/'); // Arahkan ke halaman setelah registrasi berhasil
            } catch (error) {
                console.error('Registration failed:', error);
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
                    Buat Akun Baru
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                            Nama
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                placeholder="Masukkan Nama Kamu"
                                type="text"
                                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm ${formik.errors.name ? 'border-red-600' : ''}`}
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.name ? (
                                <span className="text-red-600">{formik.errors.name}</span>
                            ) : backendErrors.name ? (
                                <span className="text-red-600">{backendErrors.name}</span>
                            ) : null}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                            Alamat Email
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
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                            Password
                        </label>
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
                            Daftar
                        </button> 
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Sudah Terdaftar? 
                    <Link to="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Masuk Sekarang
                    </Link>
                </p>
            </div>
        </div>
    );
}

import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import ErrorMessage  from '../CheckOut/ErrorMessage.js';
import './Register.css';
import { registerUser } from '../../API/api.js';
import { useNavigate } from 'react-router-dom';

function Register() {
  document.title = 'BookAHotel - register';

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required'),
    email: Yup.string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    retypePassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Retype password is required'),
  });

  return (
    <div className='register'>
      <div className='register__box'>
        <h2>Register the new account</h2>
        <Formik
        initialValues={{ username: '', email: '', password: '', retypePassword: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            const response = await registerUser(values.username, values.email, values.password);
            if (response.status === 201) {
              alert("User was created successfully");
              navigate('/login');

            }
          }
          catch (err) {
            console.error("Register error", err)
            alert("User already exists");
          }
        }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className='register__form'>
                <div>
                  <p htmlFor="username">Username</p>
                  <Field name="username" type="text" />
                </div>
                <div>
                  <p htmlFor="email">E-mail</p>
                  <Field name="email" type="email" />
                </div>
                <div>
                  <p htmlFor="password">Password</p>
                  <Field name="password" type="password" />
                </div>
                <div>
                  <p htmlFor="retypePassword">Retype Password</p>
                  <Field name="retypePassword" type="password" />
                </div>
                <ErrorMessage errors={errors} touched={touched} onClose={() => {}} />
                <div className='register-login__link'>
                  <p>Already registered?</p>
                  <Link to="/login">Sign in</Link>
                </div>
                <button className='register__button' type="submit">Register</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
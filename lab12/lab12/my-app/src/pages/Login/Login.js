import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from "../CheckOut/ErrorMessage.js";
import './Login.css';
import { loginUser } from '../../API/api.js';

function Login() {
  document.title = 'BookAHotel - login';

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Invalid email address')
    .required('Email is required'),
    password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
  });

  return (
    <div className='login'>
      <div className='login__box'>
        <h2>Submit the form to sign in</h2>
        <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            const response = await loginUser(values.email, values.password);
            if (response.status === 200) {
              localStorage.setItem('user', JSON.stringify(response.data));
              navigate('/home');
            }
          }
          catch (err) {
            console.error('Login error:', err);
            alert('Invalid email or password');
          }
        }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className='login__form'>
                <div>
                  <p htmlFor="email">E-mail</p>
                  <Field name="email" type="email" />
               </div>
                <div>
                  <p htmlFor="password">Password</p>
                  <Field name="password" type="password" />
                </div>
                <ErrorMessage errors={errors} touched={touched} />
                <div className='login-register__link'>
                  <p>Not registered?</p>
                  <Link to="/register">Sign up</Link>
                </div>
                  <button className='login__button' type="submit">Sign in</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
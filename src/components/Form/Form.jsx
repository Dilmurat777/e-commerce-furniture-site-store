import { useContext, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaRegEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { CiUser } from 'react-icons/ci';
import { FaUser } from 'react-icons/fa6';
import ReactInputMask from 'react-input-mask';
import { IoIosEyeOff, IoMdEye } from 'react-icons/io';
import { CustomContext } from '../../config/context/context';

const Form = () => {


  const location = useLocation();

	const {registerUser, loginUser} = useContext(CustomContext)

  const [passwordView, setPasswordView] = useState(false);

  const password = useRef({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({ mode: 'onBlur' });

  password.current = watch('password');



  const submitForm = (data) => {
    let { confirmPwd, ...user } = data;
    if (location.pathname === '/login') {
			loginUser(user)
    } else {
      registerUser(user);
    }
  };

  

  return (
    <div className="form">
      <div className="form__left">
        <p className="form__logo">Your Logo</p>
        <form noValidate className="form__content" onSubmit={handleSubmit(submitForm)}>
          <h2 className="form__content-title">
            {location.pathname === '/login' ? 'Sign in' : 'Sing up'}
          </h2>
          <p className="form__content-text">
            {location.pathname === '/login'
              ? "If you don't have an account register"
              : 'If you already have an account register'}
            <br /> You can
            {location.pathname === '/login' ? (
              <Link to={'/register'}> Register here!</Link>
            ) : (
              <Link to={'/login'}> Login here!</Link>
            )}
          </p>

          <label className="from__label">
            <span className="form__label-text">Email</span>
            <div className="form__label-field">
              <span className="from__label-icon">
                <FaRegEnvelope />
              </span>
              <input
                {...register('email', {
                  required: {
                    message: 'Email обязательно к заполнению',
                    value: true,
                  },
                  minLength: {
                    message: 'Минимум 10 символов',
                    value: 10,
                  },
                  pattern: {
                    message: 'Напишите правильно свой email',
                    value: /^[^ ]+@[^ ]+\.[a-z]{2,5}$/,
                  },
                })}
                className="form__label-input"
                type="email"
                placeholder="Enter your email address"
                autoComplete="username"
              />
            </div>
            <p className="register__label-error">{errors.email && errors.email?.message}</p>
          </label>

          {location.pathname === '/register' && (
            <label className="from__label">
              <span className="form__label-text">Name</span>
              <div className="form__label-field">
                <span className="from__label-icon">
                  <CiUser />
                </span>
                <input
                  {...register('name', {
                    required: {
                      message: 'Имя обязательно к заполнению',
                      value: true,
                    },
                    minLength: {
                      message: 'Минимум 2 символов',
                      value: 2,
                    },
                    pattern: {
                      message: 'Напишите правильно свой имя',
                      value: /^[а-яА-ЯёЁa-zA-Z]+$/,
                    },
                  })}
                  className="form__label-input"
                  type="text"
                  placeholder="Enter your Name"
                />
              </div>
              <p className="register__label-error">{errors.name && errors.name?.message}</p>
            </label>
          )}

          {location.pathname === '/register' && (
            <label className="from__label">
              <span className="form__label-text">Surname</span>
              <div className="form__label-field">
                <span className="from__label-icon">
                  <FaUser />
                </span>
                <input
                  {...register('surname', {
                    required: {
                      message: 'Фамилия обязательно к заполнению',
                      value: true,
                    },
                    minLength: {
                      message: 'Минимум 2 символов',
                      value: 2,
                    },
                    pattern: {
                      message: 'Напишите правильно свой Фамилия',
                      value: /^[а-яА-ЯёЁa-zA-Z]+$/,
                    },
                  })}
                  className="form__label-input"
                  type="text"
                  placeholder="Enter your Surname"
                />
              </div>
              <p className="register__label-error">{errors.surname && errors.surname?.message}</p>
            </label>
          )}
          {location.pathname === '/register' && (
            <label className="from__label">
              <span className="form__label-text">Phone</span>
              <div className="form__label-field">
                <span className="from__label-icon">
                  <FaPhoneAlt />
                </span>
                <ReactInputMask
                  mask={`+\\9\\96(999)99-99-99`}
                  {...register('phone', {
                    required: {
                      message: 'Это поле обязательно к заполнению',
                      value: true,
                    },
                    pattern: {
                      message: 'Заполните номер телефона',
                      value: /^\+996\(\d{3}\)\d{2}-\d{2}-\d{2}$/,
                    },
                  })}
                  className="form__label-input"
                  type="tel"
                  placeholder="Enter your Phone"
                />
              </div>
              <p className="register__label-error">{errors.phone && errors.phone?.message}</p>
            </label>
          )}
          <label className="from__label">
            <span className="form__label-text">Password</span>
            <div className="form__label-field">
              <span className="from__label-icon" onClick={() => setPasswordView((prev) => !prev)}>
                {passwordView ? <IoMdEye /> : <IoIosEyeOff />}
              </span>
              <input
                {...register('password', {
                  required: {
                    message: 'Пароль обязателен к заполнение',
                    value: true,
                  },
                  pattern: {
                    message: 'Пароль должен содержать не менее 8 символов, заглавную букву, число!',
                    value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
                  },
                })}
                className="form__label-input"
                type={passwordView ? 'text' : 'password'}
                placeholder="Enter your Password"
                autoComplete="new-password"
              />
            </div>
            <p className="register__label-error">{errors.password && errors.password?.message}</p>
          </label>
          {location.pathname === '/register' && (
            <label className="from__label">
              <span className="form__label-text">Confirm Password</span>
              <div className="form__label-field">
                {/* <span className="from__label-icon" onClick={() => setPasswordView(prev => !prev)}>
								{
									passwordView ? <IoMdEye /> : <IoIosEyeOff />
								}
              </span> */}
                <input
                  {...register('confirmPwd', {
                    validate: (values) =>
                      values === password.current || 'The password do not match',
                  })}
                  className="form__label-input"
                  type={passwordView ? 'text' : 'password'}
                  placeholder="Enter your Password again"
                  autoComplete="new-password"
                />
              </div>
              <p className="register__label-error">
                {errors.confirmPwd && errors.confirmPwd?.message}
              </p>
            </label>
          )}

          <button className="form__btn" type="submit">
            Login
          </button>
        </form>
      </div>
      <div className="form__right"></div>
    </div>
  );
};

export default Form;

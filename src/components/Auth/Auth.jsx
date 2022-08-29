import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { useFormik } from 'formik';
import { registerUser, loginUser, getCurUser } from 'redux/auth/authOperations';
import {
  getAuthError,
  getAuthLoading,
  isLogedIn,
} from 'redux/auth/AuthSelector';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import s from './Auth.module.css';
import Loader from 'components/Loader/Loader';
import Sprite from '../../assets/images/svg/sprite.svg';
import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { googleAuth } from '../../redux/auth/authSlise';
import { useTranslation } from 'react-i18next';

export const Auth = () => {
  const isLoading = useSelector(getAuthLoading);
  const error = useSelector(getAuthError);

  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { pathname } = useLocation();
  const token = useSelector(isLogedIn);

  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
    },

    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email(t('registration.emailErr'))
        .required(t('registration.required')),
      password: Yup.string()
        .min(7, t('registration.lengthErr'))
        .required(t('registration.required')),
    }),
  });

  useEffect(() => {
    if (pathname === '/') {
      const accessToken = searchParams.get('token');
      const refreshToken = searchParams.get('refreshToken');
      const sid = searchParams.get('sid');
      if (token) {
        dispatch(googleAuth({ accessToken, refreshToken, sid }));
        dispatch(getCurUser());
      }
      token ? navigate('expenses') : navigate('/');
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmitRegister = e => {
    e.preventDefault();
    if (formik.errors.email || formik.errors.password) {
      toast.error(t('registration.registrationInfo'), {
        autoClose: 2000,
        theme: 'colored',
      });
      return;
    }
    dispatch(
      registerUser({
        email: formik.values.email,
        password: formik.values.password,
      })
    );

    reset();
  };

  const handleSubmitLogin = e => {
    e.preventDefault();
    if (formik.errors.email || formik.errors.password) {
      toast.error(t('registration.registrationInfo'), {
        autoClose: 2000,
        theme: 'colored',
      });
      return;
    }

    dispatch(
      loginUser({
        email: formik.values.email,
        password: formik.values.password,
      })
    );

    reset();
  };

  const reset = () => {
    formik.values.email = '';
    formik.values.password = '';
  };

  return (
    <>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        <p className={s.itemForGoogle}>{t('registration.googleTitle')}</p>
        <a
          className={s.link}
          href="https://kapusta-backend.goit.global/auth/google"
          target="_blank"
          rel="noreferrer"
        >
          <svg className={s.icon} width={18} height={18}>
            <use href={`${Sprite}#icon-google`} />
          </svg>
          <span className={s.google}>Google</span>
        </a>
        <p className={s.item}>{t('registration.mainTitle')}</p>
        <div className={s.wrapper}>
          <label className={s.text} htmlFor="email">
            {formik.touched.email && formik.errors.email && (
              <span className={s.span}>*</span>
            )}
            {t('registration.email')}
          </label>
          <input
            className={s.input}
            type="email"
            name="email"
            id="email"
            placeholder="your@email.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <p className={s.error}>
            {formik.touched.email && formik.errors.email && formik.errors.email}
          </p>
        </div>
        <div className={s.wrapperPassword}>
          <label className={s.text} htmlFor="password">
            {formik.touched.password && formik.errors.password && (
              <span className={s.span}>*</span>
            )}
            {t('registration.password')}
          </label>
          <input
            className={s.input}
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <p className={s.error}>
            {formik.touched.password &&
              formik.errors.password &&
              formik.errors.password}
          </p>
        </div>
        <>
          <div className={s.wrapperButtons}>
            <button
              className={s.buttonSubmit}
              type="submit"
              onClick={handleSubmitLogin}
            >
              {t('registration.enter')}
            </button>
            <button
              className={s.button}
              type="submit"
              onClick={handleSubmitRegister}
            >
              {t('registration.registration')}
            </button>
          </div>
        </>
      </form>
      {isLoading && <Loader />}
      {error === 'Request failed with status code 400' &&
        formik.values.email === '' &&
        formik.values.password === '' &&
        !formik.errors.email &&
        !formik.errors.password && (
          <div className={s.notificationError}>
            {t('registration.registrationErr1')}
          </div>
        )}
      {error === 'Request failed with status code 409' &&
        formik.values.email === '' &&
        formik.values.password === '' &&
        !formik.errors.email &&
        !formik.errors.password && (
          <div className={s.notificationError}>
            {t('registration.registrationErr2')}
          </div>
        )}
      {error === 'Request failed with status code 403' &&
        formik.values.email === '' &&
        formik.values.password === '' &&
        !formik.errors.email &&
        !formik.errors.password && (
          <div className={s.notificationError}>
            {t('registration.registrationErr3')}
          </div>
        )}
    </>
  );
};

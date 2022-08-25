import s from './AuthModal.module.css';

export const AuthModal = () => {
  return (
    <div className={s.modalWindow}>
      <div className={s.modal}>
        <p className={s.firstText}>
          Hello! To get started, enter the current balance of your account!
        </p>
        <p className={s.secondText}>
          You can't spend money until you have it :)
        </p>
      </div>
      <div className={s.part}></div>;
    </div>
  );
};

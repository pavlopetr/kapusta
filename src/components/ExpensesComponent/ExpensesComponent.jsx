import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addExpenseTransaction,
  getExpenseTransaction,
} from '../../redux/transaction/transaction-operations';
import {
  getExpensesTransactions,
  isLoading,
} from 'redux/transaction/transaction-selector';
import { expensesStats } from 'redux/monthsStats/monthsStats-selector';
import Loader from 'components/Loader/Loader';
import { Summary } from 'components/Summary/Summary';
import FormTransaction from 'components/FormTransaction/FormTransaction';
import TransactionList from 'components/TransactionList/TransactionList';
import s from './ExpensesComponent.module.css';
import { getEmailUser } from 'redux/auth/AuthSelector';
import { useTranslation } from 'react-i18next';

const ExpensesComponent = () => {
  const [date, setDate] = useState(new Date());
  const loading = useSelector(isLoading);
  const email = useSelector(getEmailUser);
  const monthStats = useSelector(expensesStats);
  const transactions = useSelector(getExpensesTransactions);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const expensesCategArray = t('expensesCategArray', { returnObjects: true });

  useEffect(() => {
    if (email && transactions.length === 0) dispatch(getExpenseTransaction());
    // eslint-disable-next-line
  }, [transactions.length, email]);

  return (
    <>
      {console.log(monthStats)}
      <FormTransaction
        operation={addExpenseTransaction}
        options={expensesCategArray}
        date={date}
        setDate={setDate}
      />
      <div className={s.transactions}>
        <TransactionList
          location="expenses"
          transactionsArray={transactions.filter(
            el => el.date === date.toISOString().slice(0, 10)
          )}
          monthStats={monthStats}
        />
        <Summary monthStats={monthStats} />
      </div>
      {loading && <Loader />}
    </>
  );
};

export default ExpensesComponent;

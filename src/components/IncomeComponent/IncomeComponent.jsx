import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getIncomesTransactions,
  isLoading,
} from 'redux/transaction/transaction-selector';
import Loader from 'components/Loader/Loader';
import FormTransaction from 'components/FormTransaction/FormTransaction';
import { Summary } from 'components/Summary/Summary';
import TransactionList from 'components/TransactionList/TransactionList';
import {
  addIncomeTransaction,
  getIncomeTransaction,
} from 'redux/transaction/transaction-operations';
import { incomesStats } from 'redux/monthsStats/monthsStats-selector';
import s from './IncomeComponent.module.css';
import { getEmailUser } from 'redux/auth/AuthSelector';
import { useTranslation } from 'react-i18next';

const IncomeComponent = () => {
  const [date, setDate] = useState(new Date());
  const loading = useSelector(isLoading);
  const email = useSelector(getEmailUser);
  const transactions = useSelector(getIncomesTransactions);
  const monthStats = useSelector(incomesStats);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const incomeCategArray = t('incomeCategArray', { returnObjects: true });

  useEffect(() => {
    if (email && transactions.length === 0) dispatch(getIncomeTransaction());
    // eslint-disable-next-line
  }, [transactions.length, email]);

  return (
    <>
      <FormTransaction
        operation={addIncomeTransaction}
        options={incomeCategArray}
        date={date}
        setDate={setDate}
      />
      <div className={s.transactions}>
        <TransactionList
          location="incomes"
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

export default IncomeComponent;

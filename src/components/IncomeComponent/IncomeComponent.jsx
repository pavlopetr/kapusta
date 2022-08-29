import React from 'react';
import { useSelector } from 'react-redux';
import {
  getIncomesTransactions,
  isLoading,
} from 'redux/transaction/transaction-selector';
import options from '../../data/incomeForm.json';
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

const IncomeComponent = () => {
  const loading = useSelector(isLoading);
  return (
    <>
      <FormTransaction operation={addIncomeTransaction} options={options} />
      <div className={s.transactions}>
        <TransactionList
          operation={getIncomeTransaction()}
          selector={getIncomesTransactions}
          location="incomes"
        />
        <Summary selector={incomesStats} />
      </div>
      {loading && <Loader />}
    </>
  );
};

export default IncomeComponent;

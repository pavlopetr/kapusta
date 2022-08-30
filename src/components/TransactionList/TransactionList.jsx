import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { nanoid } from 'nanoid';
import expenses from '../../data/expensesReports.json';
import incomeCategories from '../../data/incomeReports.json';
import { removeTransaction } from 'redux/transaction/transaction-operations';
import s from './TransactionList.module.css';
import { getEmailUser } from 'redux/auth/AuthSelector';

const TransactionList = ({ transactionsArray, location }) => {
  const email = useSelector(getEmailUser);
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const expenseReport = t('expenseReport', { returnObjects: true });

  const createNewArray = array => {
    const addArray = Array(10 - array.length)
      .fill({
        _id: '',
        description: '',
        amount: null,
        date: '',
        category: '',
      })
      .map(el => ({ ...el, _id: nanoid() }));
    return [...array, ...addArray];
  };

  const arrayTable =
    transactionsArray.length < 10
      ? createNewArray(transactionsArray)
      : transactionsArray;

  return (
    <>
      <div>
        {email && (
          <ul className={s.transactionList}>
            <li className={s.header}>
              <h3 className={s.headTitle}>{t('transactions.date')}</h3>
              <h3 className={s.headTitle}>{t('transactions.descr')}</h3>
              <h3 className={s.headTitle}>{t('transactions.categ')}</h3>
              <h3 className={s.headTitle}>{t('transactions.sum')}</h3>
              <h3></h3>
            </li>
            <li></li>
          </ul>
        )}
        <div className={s.bla}>
          {email && (
            <table className={s.table}>
              <tbody className={s.tableBody}>
                {arrayTable.map((item, index) => (
                  <tr key={item._id}>
                    <td className={s.tdDate}>
                      {item.date && item.date.split('-').reverse().join('.')}
                    </td>
                    <td>{item.description && item.description}</td>
                    <td>
                      {item.category && location === 'expenses'
                        ? expenseReport[item.category].title
                        : incomeCategories[item.category]}
                    </td>
                    <td
                      style={
                        location === 'expenses'
                          ? { color: 'red', fontWeight: 'bold' }
                          : { color: 'green', fontWeight: 'bold' }
                      }
                    >
                      {location === 'expenses' && item.amount && '-'}
                      &nbsp;
                      {item.amount &&
                        `${item.amount
                          .toFixed(2)
                          .replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')} ${t(
                          'general.currencyName'
                        )}`}
                    </td>
                    {item.amount && (
                      <button
                        className={s.buttonDelete}
                        onClick={() => dispatch(removeTransaction(item._id))}
                      ></button>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

TransactionList.propTypes = {
  transactionsArray: PropTypes.array.isRequired,
  location: PropTypes.string.isRequired,
};

export default TransactionList;

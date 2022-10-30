import PropTypes from 'prop-types';
import CategoriesList from 'components/CategoriesList/CategoriesList';
import Paginator from 'components/Paginator/Paginator';
import s from './ReportsCategories.module.css';
import { useTranslation } from 'react-i18next';

const ReportsCategories = ({
  userExpenses,
  userIncome,
  category,
  onCategoryChange,
  type,
  setType,
  setCategory,
}) => {
  const { t } = useTranslation();
  const paginationCat = t('pagination', { returnObjects: true });

  const onBtnClick = () => {
    if (type === 'expenses') {
      setType('income');
      setCategory('');
      return;
    }
    setType('expenses');
    setCategory('');
  };

  return (
    <div className={s.block}>
      <Paginator
        clickPrev={onBtnClick}
        clickNext={onBtnClick}
        descr={paginationCat[type]}
      />
      <CategoriesList
        transactions={
          type === 'expenses'
            ? userExpenses.expensesData
            : userIncome.incomesData
        }
        category={category}
        type={type}
        onCategoryChange={onCategoryChange}
      />
    </div>
  );
};

ReportsCategories.propTypes = {
  userExpenses: PropTypes.object.isRequired,
  userIncome: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
};

export default ReportsCategories;

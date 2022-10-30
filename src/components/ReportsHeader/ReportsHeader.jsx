import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Balance } from 'components/Balance/Balance';
import Paginator from 'components/Paginator/Paginator';
import s from './ReportsHeader.module.css';
import { useTranslation } from 'react-i18next';

const ReportsHeader = ({ month, setMonth, setCategory }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const monthsPag = t('monthsPag', { returnObjects: true });

  const dateFormatStr1 =
    monthsPag[`${moment().add(month, 'month').format('MMMM')}`];
  const dateFormatStr2 = moment().add(month, 'month').format('YYYY');

  const onBtnPrevClick = () => {
    setMonth(prev => prev - 1);
    setCategory('');
  };

  const onBtnNextClick = () => {
    setMonth(prev => prev + 1);
    setCategory('');
  };

  return (
    <div className={s.block}>
      <div className={s.wrapper}>
        <button className={s.btnPrevPage} onClick={e => navigate(-1)}></button>
        <p className={s.mainPage}>{t('nav.mainPage')}</p>
      </div>
      <div className={s.reportsSection}>
        <Balance />
        <div className={s.blockMonth}>
          <p className={s.currentPeriod}>{t('reports.period')}</p>
          <Paginator
            clickPrev={onBtnPrevClick}
            clickNext={onBtnNextClick}
            descr={`${dateFormatStr1} ${dateFormatStr2}`}
            disableNext={month === 0}
          />
        </div>
      </div>
    </div>
  );
};

ReportsHeader.propTypes = {
  month: PropTypes.number.isRequired,
  setMonth: PropTypes.func.isRequired,
  setCategory: PropTypes.func.isRequired,
};

export default ReportsHeader;

import css from './Button.module.css';

export const Button = ({ onLoadMoreClick }) => (
  <div className={css.wrapper}>
    <button className={css.button} type="button" onClick={onLoadMoreClick}>
      Load more
    </button>
  </div>
);

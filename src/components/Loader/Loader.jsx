import { Circles } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = ({ visible }) => (
  <Circles
    height="80"
    width="80"
    color="#3f51b5"
    ariaLabel="circles-loading"
    wrapperStyle={{}}
    wrapperClass={css.loader}
    visible={visible}
  />
);

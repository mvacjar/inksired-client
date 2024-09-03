import styles from './discount.module.scss';
import classNames from 'classnames';

export function Discount(props) {
  const { children, className } = props;

  return (
    <span
      className={classNames(styles.labelDiscount, { [className]: className })}
    >
      {children}
    </span>
  );
}

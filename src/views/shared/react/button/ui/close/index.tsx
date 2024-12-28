import { type ButtonHTMLAttributes } from 'react';
import cn from 'classnames';
import { Icon } from '@/shared/react/icon';

enum ReactButtonCloseVariant {
  DEFAULT = 'bg-beige-100 hover:bg-beige-200 *:stroke-gold-100',
}

export type IReactButtoClose = {
  variant?: ReactButtonCloseVariant
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const ReactButtonClose: FCClass<IReactButtoClose> = ({
  className,
  variant = ReactButtonCloseVariant.DEFAULT,
  ...props
}) => {
  return (
    <button
      className={cn('flex justify-center items-center w-10 h-10 t:w-12 t:h-12 xxl:w-14 xxl:h-14 transition rounded-full', variant, className)}
      type='button'
      {...props}
    >
      <Icon className={'w-3.5 h-3.5'} icon={'plus'} />
    </button>
  );
}

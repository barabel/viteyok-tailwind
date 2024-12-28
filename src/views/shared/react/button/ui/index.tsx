import cn from 'classnames';
import { type IconsArray } from '@/shared/enums';
import { Icon } from '../../icon';

export interface TReactButton {
  title: string
  url?: string
  disabled?: boolean
  onClick?: () => void
  icon?: `${IconsArray}` | IconsArray
  type?: 'button' | 'submit' | 'reset'
  typography?: string
  isAttention?: boolean
  leftIcon?: boolean
  theme?: ButtonTheme
}

enum ButtonTheme {
  default = 'bg-gold-100 text-white-100 rounded-20xl hover:bg-gold-200',
}

export const ReactButton: FCClass<TReactButton> = ({
  className,
  title,
  url,
  disabled,
  onClick,
  type = 'button',
  typography = 't2',
  leftIcon = true,
  icon,
  theme = ButtonTheme.default,
  ...props
}) => {
  const Tag = url ? 'a' : 'button';
  const isExternal = url ? 'url' : false;

  return (
    <Tag
      className={cn('flex items-center transition h-12 t:h-14 xxl:h-16 px-10 w-fit',
        className,
        typography,
        theme,
      )}
      href={url}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer noopener' : undefined}
      disabled={disabled}
      type={url ? undefined : type}
      {...props}
    >
      {icon && leftIcon && (
        <div className={cn('')}>
          <Icon icon={icon} className={''} />
        </div>
      )}

      {title && (
        <span className={typography}>
          {title}
        </span>
      )}

      {icon && !leftIcon && (
        <div className={cn('')}>
          <Icon icon={icon} className={''} />
        </div>
      )}
    </Tag>
  );
}

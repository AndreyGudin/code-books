import { memo } from 'react';
import type { FC } from 'react';
import type { LinkProps } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'red';

interface AppLinkProps extends LinkProps {
  className?: string;
  variant?: AppLinkVariant;
  activeClassName?: string;
}

export const AppLink: FC<AppLinkProps> = memo((props: AppLinkProps) => {
  const {
    to,
    className = '',
    children,
    variant = 'primary',
    activeClassName = '',
    ...otherProps
  } = props;

  return (
    <NavLink
      className={({ isActive }) =>
        classNames(cls.AppLink, { [activeClassName]: isActive }, [
          className,
          cls[variant]
        ])
      }
      to={to}
      {...otherProps}
    >
      {children}
    </NavLink>
  );
});

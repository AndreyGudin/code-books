import { memo, useCallback } from 'react';
import type { FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Code.module.scss';
import { Icon } from '../Icon';
import CopyIcon from '@/shared/assets/icons/copy_new.svg';

interface CodeProps {
  className?: string;
  text: string;
}

export const Code: FC<CodeProps> = memo(
  ({ text, className = '' }: CodeProps) => {
    const onCopy = useCallback(() => {
      navigator.clipboard.writeText(text).catch((e) => {
        console.log(e);
      });
    }, [text]);
    return (
      <pre className={classNames(cls.Code, {}, [className])}>
        <Icon
          clickable
          onClick={onCopy}
          className={cls.copyBtn}
          Svg={CopyIcon}
        />
        <code>{text}</code>
      </pre>
    );
  }
);

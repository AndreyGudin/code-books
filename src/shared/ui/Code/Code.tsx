import { memo, useCallback } from 'react';
import type { FC } from 'react';

import { Button, ButtonTheme } from '../Button/Button';

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Code.module.scss';
import CopyIcon from 'shared/assets/icons/copy.svg';

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
        <Button
          onClick={onCopy}
          className={cls.copyBtn}
          theme={ButtonTheme.CLEAR}
        >
          <CopyIcon className={cls.copyIcon} />
        </Button>
        <code>{text}</code>
      </pre>
    );
  }
);

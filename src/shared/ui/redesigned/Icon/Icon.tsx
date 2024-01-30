import { memo } from 'react';
import type { FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

interface NonClickableIconProps extends IconBaseProps {
  clickable?: false;
}

interface ClickableIconProps extends IconBaseProps {
  clickable?: true;
  onClick: () => void;
}

type IconProps = NonClickableIconProps | ClickableIconProps;

export const Icon: FC<IconProps> = memo<IconProps>((props: IconProps) => {
  const {
    className = '',
    Svg,
    width = 32,
    height = 32,
    clickable,
    ...otherProps
  } = props;

  let icon = (
    <Svg
      className={classNames(cls.Icon, {}, [className])}
      width={width}
      height={height}
      {...otherProps}
      onClick={undefined}
    />
  );

  if (clickable) {
    icon = (
      <button
        className={classNames(cls.Icon, {}, [className, cls.button])}
        style={{ height, width }}
        type="button"
        onClick={props.onClick}
      >
        <Svg
          width={width}
          height={height}
          {...otherProps}
          onClick={undefined}
        />
      </button>
    );
    return icon;
  }

  return icon;
});

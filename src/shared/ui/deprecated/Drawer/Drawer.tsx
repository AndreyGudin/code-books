import { memo, useCallback, useEffect } from 'react';
import type { FC, ReactNode } from 'react';

import { type Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Drawer.module.scss';
import { Portal } from '../../redesigned/Portal/Portal';
import { Overlay } from '../../redesigned/Overlay/Overlay';
import {
  AnimationProvider,
  useAnimationLibs
} from '@/shared/lib/components/AnimateProvider';
import { useModal } from '@/shared/hooks/useModal';

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const height = window.innerHeight - 100;
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const DrawerContent: FC<DrawerProps> = memo(
  ({
    className = '',
    children,
    onClose = () => {},
    isOpen = false
  }: DrawerProps) => {
    const { Gesture, Spring } = useAnimationLibs();
    const { close, animate } = useModal({ isOpen, onClose });
    const [{ y }, api] = Spring.useSpring(() => ({ y: height }));

    const openDrawer = useCallback(() => {
      api.start({ y: 0, immediate: false });
    }, [api]);

    useEffect(() => {
      if (animate) openDrawer();
    }, [animate, openDrawer]);

    const closeDrawer = (velocity = 0): void => {
      api.start({
        y: height,
        immediate: false,
        config: { ...Spring.config.stiff, velocity },
        onResolve: close
      });
    };

    const bind = Gesture.useDrag(
      ({
        last,
        velocity: [, vy],
        direction: [, dy],
        movement: [, my],
        cancel
      }) => {
        if (my < -70) cancel();

        if (last) {
          if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
            closeDrawer();
          } else {
            openDrawer();
          }
        } else {
          api.start({ y: my, immediate: true });
        }
      },
      {
        from: () => [0, y.get()],
        filterTaps: true,
        bounds: { top: 0 },
        rubberband: true
      }
    );

    if (!isOpen) return null;

    const mods: Mods = {
      [cls.opened]: animate
    };

    const display = y.to((py) => (py < height ? 'block' : 'none'));

    return (
      <Portal>
        <div
          className={classNames(cls.Drawer, mods, [className, 'app_drawer'])}
        >
          <Overlay onClick={closeDrawer}>
            <Spring.a.div
              className={cls.sheet}
              style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
              {...bind()}
            >
              {children}
            </Spring.a.div>
          </Overlay>
        </div>
      </Portal>
    );
  }
);
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const DrawerAsync = (props: DrawerProps): JSX.Element | null => {
  const { isLoaded } = useAnimationLibs();

  if (!isLoaded) {
    return null;
  }

  return <DrawerContent {...props} />;
};
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Drawer = (props: DrawerProps): JSX.Element => {
  return (
    <AnimationProvider>
      <DrawerAsync {...props} />
    </AnimationProvider>
  );
};
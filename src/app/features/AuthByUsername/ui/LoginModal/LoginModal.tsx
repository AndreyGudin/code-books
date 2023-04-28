import type { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginModal.module.scss';
import { Modal } from 'shared/ui/Modal/Modal';
import { LoginForm } from '../LoginForm/LoginForm';

interface LoginModalProps {
  className?: string;
  animate?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export const LoginModal: FC<LoginModalProps> = ({
  className = '',
  animate = false,
  isOpen = false,
  onClose
}: LoginModalProps) => {
  return (
    <Modal
      className={classNames(cls.LoginModal, {}, [className])}
      animate={animate}
      isOpen={isOpen}
      onClose={onClose}
    >
      <LoginForm />
    </Modal>
  );
};

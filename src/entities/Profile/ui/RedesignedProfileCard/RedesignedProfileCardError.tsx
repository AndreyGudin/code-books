import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './ProfileCard.new.module.scss';

interface RedesignedProfileCardErrorProps {
  className?: string;
}

export const RedesignedProfileCardError: FC<
  RedesignedProfileCardErrorProps
> = ({ className = '' }: RedesignedProfileCardErrorProps) => {
  const { t } = useTranslation('profile');
  return (
    <HStack
      justify="center"
      className={classNames(cls.ProfileCard, {}, [className, cls.error])}
    >
      <Text
        variant={'error'}
        title={t('Произошла ошибка при загрузке профиля')}
        text={t('Попробуйте перезагрузить страницу')}
        align={'center'}
      />
    </HStack>
  );
};

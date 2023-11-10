import { useTranslation } from 'react-i18next';
import { memo, useState } from 'react';
import type { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './UiDesignSwitcher.module.scss';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { getFeatureFlag, updateFeaturesFlags } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { getAuthUserData } from '@/entities/User';
import { useSelector } from 'react-redux';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface UiDesignSwitcherProps {
  className?: string;
}

export const UiDesignSwitcher: FC<UiDesignSwitcherProps> = memo(
  ({ className = '' }: UiDesignSwitcherProps) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const isAppRedesigned = getFeatureFlag('isAppRedesigned');
    const authData = useSelector(getAuthUserData);
    const items = [
      {
        content: t('Новый'),
        value: 'new'
      },
      {
        content: t('Старый'),
        value: 'old'
      }
    ];

    const onChange = async (value: string): Promise<void> => {
      if (authData) {
        console.log('value', value);
        setIsLoading(true);
        await dispatch(
          updateFeaturesFlags({
            userId: authData?.id,
            newFeatures: {
              isAppRedesigned: value === 'new'
            }
          })
        ).unwrap();
        setIsLoading(false);
      }
    };

    return (
      <VStack>
        <Text text={t('Вариант интерфейса') ?? ''} />
        {isLoading ? (
          <Skeleton width={100} height={40} />
        ) : (
          <ListBox
            onChange={onChange}
            value={isAppRedesigned ? 'new' : 'old'}
            items={items}
            className={classNames(cls.UiDesignSwitcher, {}, [className])}
          />
        )}
      </VStack>
    );
  }
);

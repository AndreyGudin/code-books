import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import type { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SettingsPage.module.scss';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { UiDesignSwitcher } from '@/features/UiDesignSwitcher';

interface SettingsPageProps {
  className?: string;
}

const SettingsPage: FC<SettingsPageProps> = memo(
  ({ className = '' }: SettingsPageProps) => {
    const { t } = useTranslation();
    return (
      <Page className={classNames(cls.SettingsPage, {}, [className])}>
        <VStack gap="16">
          <Text title={t('Настройки пользователя')} />
          <UiDesignSwitcher />
        </VStack>
      </Page>
    );
  }
);

export default SettingsPage;

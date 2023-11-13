import { useTranslation } from 'react-i18next';
import { memo, useEffect, useState } from 'react';
import type { FC } from 'react';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Text } from '@/shared/ui/deprecated/Text';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useDevice } from '@/shared/hooks/useDevice';
import { Drawer } from '@/shared/ui/redesigned/Drawer';

export const ArticlePageGreeting: FC = memo(() => {
  const { t } = useTranslation();
  const isMobile = useDevice();
  const [isOpen, setIsOpen] = useState(false);
  const { isArticlesPageWasOpened } = useJsonSettings();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isArticlesPageWasOpened) {
      setIsOpen(true);
      dispatch(saveJsonSettings({ isArticlesPageWasOpened: true })).catch(
        (e) => {
          console.log(e);
        }
      );
    }
  }, [dispatch, isArticlesPageWasOpened]);

  const onClose = (): void => {
    setIsOpen(false);
  };

  const text = (
    <Text
      title={t('Добро пожаловать на страницу статей')}
      text={t(
        'Здесь вы можете искать и просматривать статьи на различные темы'
      )}
    />
  );

  if (isMobile)
    return (
      <Drawer isOpen={isOpen} onClose={onClose}>
        {text}
      </Drawer>
    );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {text}
    </Modal>
  );
});

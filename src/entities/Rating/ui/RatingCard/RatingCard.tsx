import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import type { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './RatingCard.module.scss';
import { Card } from '@/shared/ui/Card/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Input } from '@/shared/ui/Input/Input';
import { Button } from '@/shared/ui/Button/Button';
import { ButtonTheme } from '@/shared/ui/Button/const';
import { useDevice } from '@/shared/hooks/useDevice';
import { Drawer } from '@/shared/ui/Drawer/Drawer';

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
}

export const RatingCard: FC<RatingCardProps> = memo(
  ({
    className = '',
    feedbackTitle,
    hasFeedback,
    onAccept,
    onCancel,
    title
  }: RatingCardProps) => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(0);
    const [feedback, setFeedback] = useState('');
    const isMobile = useDevice();

    const onSelectStars = useCallback(
      (selectedStars: number) => {
        setStarsCount(selectedStars);
        if (hasFeedback !== undefined && hasFeedback) {
          setIsModalOpen(true);
        } else {
          onAccept?.(selectedStars);
        }
      },
      [hasFeedback, onAccept]
    );

    const acceptHandler = useCallback(() => {
      setIsModalOpen(false);
      onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandler = useCallback(() => {
      setIsModalOpen(false);
      onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
      <>
        <Text title={feedbackTitle} />
        <Input
          value={feedback}
          onChange={setFeedback}
          placeholder={t('Ваш отзыв') ?? ''}
        />
      </>
    );

    if (isMobile)
      return (
        <Card className={classNames(cls.RatingCard, {}, [className])}>
          <VStack align="center" gap="8">
            <Text title={title} />
            <StarRating size={40} onSelect={onSelectStars} />
          </VStack>
          <Drawer isOpen={isModalOpen} onClose={cancelHandler}>
            <VStack max gap="16">
              {modalContent}
              <Button onClick={acceptHandler}>{t('Отправить')}</Button>
            </VStack>
          </Drawer>
        </Card>
      );

    return (
      <Card className={classNames(cls.RatingCard, {}, [className])}>
        <VStack align="center" gap="8">
          <Text title={title} />
          <StarRating size={40} onSelect={onSelectStars} />
        </VStack>
        <Modal isOpen={isModalOpen}>
          <VStack gap="32" max>
            {modalContent}
            <HStack max gap="16" justify="end">
              <Button onClick={cancelHandler} theme={ButtonTheme.OUTLINE_RED}>
                {t('Закрыть')}
              </Button>
              <Button onClick={acceptHandler}>{t('Отправить')}</Button>
            </HStack>
          </VStack>
        </Modal>
      </Card>
    );
  }
);

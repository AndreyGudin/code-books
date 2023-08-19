import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import type { FC } from 'react';
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
import { useDelay } from '@/shared/hooks/useDelay';

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
  rate?: number;
}

export const RatingCard: FC<RatingCardProps> = memo(
  ({
    className = '',
    feedbackTitle,
    hasFeedback,
    onAccept,
    onCancel,
    title,
    rate = 0
  }: RatingCardProps) => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
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

    const { delayedHandler } = useDelay({ handler: cancelHandler });

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
        <Card className={className} fullWidth>
          <VStack align="center" gap="8" max>
            <Text title={title} />
            <StarRating
              selectedStars={rate}
              size={40}
              onSelect={onSelectStars}
            />
          </VStack>
          <Drawer isOpen={isModalOpen} onClose={delayedHandler}>
            <VStack max gap="16">
              {modalContent}
              <Button onClick={acceptHandler}>{t('Отправить')}</Button>
            </VStack>
          </Drawer>
        </Card>
      );

    return (
      <Card className={className} fullWidth>
        <VStack align="center" gap="8" max>
          <Text title={title !== undefined ? t('Спасибо за оценку') : title} />
          <StarRating selectedStars={rate} size={40} onSelect={onSelectStars} />
        </VStack>
        <Modal isOpen={isModalOpen}>
          <VStack gap="32" max>
            {modalContent}
            <HStack max gap="16" justify="end">
              <Button onClick={delayedHandler} theme={ButtonTheme.OUTLINE_RED}>
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

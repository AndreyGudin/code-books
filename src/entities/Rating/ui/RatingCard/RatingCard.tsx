import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import type { FC } from 'react';
import { Card } from '@/shared/ui/deprecated/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/deprecated/Text';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Input } from '@/shared/ui/deprecated/Input';
import { Button } from '@/shared/ui/deprecated/Button';
import { ButtonTheme } from '@/shared/ui/deprecated/Button/const';
import { useDevice } from '@/shared/hooks/useDevice';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
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
          data-testid="RatingCard.Input"
          value={feedback}
          onChange={setFeedback}
          placeholder={t('Ваш отзыв') ?? ''}
        />
      </>
    );

    if (isMobile)
      return (
        <Card data-testid={'RatingCard'} className={className} fullWidth>
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
              <Button data-testid="RatingCard.Send" onClick={acceptHandler}>
                {t('Отправить')}
              </Button>
            </VStack>
          </Drawer>
        </Card>
      );

    return (
      <Card data-testid={'RatingCard'} className={className} fullWidth>
        <VStack align="center" gap="8" max>
          <Text title={title !== undefined ? t('Спасибо за оценку') : title} />
          <StarRating selectedStars={rate} size={40} onSelect={onSelectStars} />
        </VStack>
        <Modal isOpen={isModalOpen}>
          <VStack gap="32" max>
            {modalContent}
            <HStack max gap="16" justify="end">
              <Button
                data-testid="RatingCard.Close"
                onClick={delayedHandler}
                theme={ButtonTheme.OUTLINE_RED}
              >
                {t('Закрыть')}
              </Button>
              <Button data-testid="RatingCard.Send" onClick={acceptHandler}>
                {t('Отправить')}
              </Button>
            </HStack>
          </VStack>
        </Modal>
      </Card>
    );
  }
);

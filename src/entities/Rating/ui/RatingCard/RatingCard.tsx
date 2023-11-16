import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import type { FC } from 'react';
import { Card as DeprecatedCard } from '@/shared/ui/deprecated/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text as DeprecatedText } from '@/shared/ui/deprecated/Text';
import { StarRating } from '@/shared/ui/redesigned/StarRating';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Input as DeprecatedInput } from '@/shared/ui/deprecated/Input';
import { Button as DeprecatedButton } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { ButtonTheme } from '@/shared/ui/deprecated/Button/const';
import { useDevice } from '@/shared/hooks/useDevice';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { useDelay } from '@/shared/hooks/useDelay';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Card } from '@/shared/ui/redesigned/Card';

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
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <>
            <Text title={feedbackTitle} />
            <Input
              data-testid="RatingCard.Input"
              value={feedback}
              onChange={setFeedback}
              placeholder={t('Ваш отзыв') ?? ''}
            />
          </>
        }
        off={
          <>
            <DeprecatedText title={feedbackTitle} />
            <DeprecatedInput
              data-testid="RatingCard.Input"
              value={feedback}
              onChange={setFeedback}
              placeholder={t('Ваш отзыв') ?? ''}
            />
          </>
        }
      />
    );

    const desktopContent = (
      <>
        <VStack align="center" gap="8" max>
          <DeprecatedText
            title={title !== undefined ? t('Спасибо за оценку') : title}
          />
          <StarRating selectedStars={rate} size={40} onSelect={onSelectStars} />
        </VStack>
        <Modal isOpen={isModalOpen}>
          <VStack gap="32" max>
            {modalContent}
            <ToggleFeatures
              feature="isAppRedesigned"
              on={
                <HStack max gap="16" justify="end">
                  <Button
                    data-testid="RatingCard.Close"
                    onClick={delayedHandler}
                    variant={'outline'}
                  >
                    {t('Закрыть')}
                  </Button>
                  <Button data-testid="RatingCard.Send" onClick={acceptHandler}>
                    {t('Отправить')}
                  </Button>
                </HStack>
              }
              off={
                <HStack max gap="16" justify="end">
                  <DeprecatedButton
                    data-testid="RatingCard.Close"
                    onClick={delayedHandler}
                    theme={ButtonTheme.OUTLINE_RED}
                  >
                    {t('Закрыть')}
                  </DeprecatedButton>
                  <DeprecatedButton
                    data-testid="RatingCard.Send"
                    onClick={acceptHandler}
                  >
                    {t('Отправить')}
                  </DeprecatedButton>
                </HStack>
              }
            />
          </VStack>
        </Modal>
      </>
    );

    const mobileContent = (
      <>
        <VStack align="center" gap="8" max>
          <DeprecatedText title={title} />
          <StarRating selectedStars={rate} size={40} onSelect={onSelectStars} />
        </VStack>
        <Drawer isOpen={isModalOpen} onClose={delayedHandler}>
          <VStack max gap="16">
            {modalContent}
            <ToggleFeatures
              feature="isAppRedesigned"
              on={
                <>
                  <Button
                    data-testid="RatingCard.Send"
                    onClick={acceptHandler}
                    size="l"
                  >
                    {t('Отправить')}
                  </Button>
                </>
              }
              off={
                <>
                  <DeprecatedButton
                    data-testid="RatingCard.Send"
                    onClick={acceptHandler}
                  >
                    {t('Отправить')}
                  </DeprecatedButton>
                </>
              }
            />
          </VStack>
        </Drawer>
      </>
    );

    if (isMobile)
      return (
        <ToggleFeatures
          feature="isAppRedesigned"
          on={
            <Card
              border="round"
              data-testid={'RatingCard'}
              className={className}
              fullWidth
            >
              {mobileContent}
            </Card>
          }
          off={
            <DeprecatedCard
              data-testid={'RatingCard'}
              className={className}
              fullWidth
            >
              {mobileContent}
            </DeprecatedCard>
          }
        />
      );

    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <Card data-testid={'RatingCard'} className={className} fullWidth>
            {desktopContent}
          </Card>
        }
        off={
          <DeprecatedCard
            data-testid={'RatingCard'}
            className={className}
            fullWidth
          >
            {desktopContent}
          </DeprecatedCard>
        }
      />
    );
  }
);

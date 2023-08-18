import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page/Page';
import { RatingCard } from '@/entities/Rating';

const MainPage: FC = () => {
  const { t } = useTranslation('main');
  return (
    <Page>
      {t('Главная страница')}
      <RatingCard
        title={'Как вам статья?'}
        feedbackTitle="Оставьте свой отзыв"
        hasFeedback
      />
    </Page>
  );
};

export default MainPage;

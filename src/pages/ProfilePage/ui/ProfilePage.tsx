import type { FC } from 'react';
import { useParams } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

import cls from './ProfilePage.module.scss';
import { VStack } from '@/shared/ui/Stack/VStack/VStack';
import { EditableProfileCard } from '@/features/EditableProfileCard';

interface ProfilePageProps {
  className?: string;
}

const ProfilePage: FC<ProfilePageProps> = ({
  className = ''
}: ProfilePageProps) => {
  const { id } = useParams<{ id: string }>();

  return (
    <Page className={classNames(cls.ProfilePage, {}, [className])}>
      <VStack max gap="16">
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  );
};

export default ProfilePage;

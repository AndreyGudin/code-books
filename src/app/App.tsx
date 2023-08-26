import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { AppRouter } from './providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';

import './styles/index.scss';
import { getUserMounted, userActions } from '@/entities/User';

const App: FC = () => {
  const dispatch = useDispatch();
  const mounted = useSelector(getUserMounted);

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className={classNames('app', {}, [])}>
      <Suspense fallback="">
        <Navbar />

        <div className="content-page">
          <Sidebar />
          {mounted !== undefined && mounted ? <AppRouter /> : null}
        </div>
      </Suspense>
    </div>
  );
};

export default App;

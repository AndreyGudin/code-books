import { Suspense, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { AppRouter } from './providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';

import './styles/index.scss';
import { getUserMounted, initAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { PageLoader } from '@/widgets/PageLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { useAppToolbar } from './lib/useAppToolbar';
import { withTheme } from './providers/ThemeProviders/ui/withTheme';

const App: FC = memo(() => {
  const dispatch = useAppDispatch();
  const mounted = useSelector(getUserMounted);
  const toolbar = useAppToolbar();

  useEffect(() => {
    dispatch(initAuthData()).catch((e) => {
      console.log(e);
    });
  }, [dispatch]);

  if (!mounted)
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <div id="app" className={classNames('app_redesigned', {}, [])}>
            <AppLoaderLayout />
          </div>
        }
        off={<PageLoader />}
      />
    );

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <div id="app" className={classNames('app_redesigned', {}, [])}>
          <Suspense fallback="">
            <MainLayout
              content={<AppRouter />}
              header={<Navbar />}
              sidebar={<Sidebar />}
              toolbar={toolbar}
            />
          </Suspense>
        </div>
      }
      off={
        <div id="app" className={classNames('app', {}, [])}>
          <Suspense fallback="">
            <Navbar />

            <div className="content-page">
              <Sidebar />
              {mounted !== undefined && mounted ? <AppRouter /> : null}
            </div>
          </Suspense>
        </div>
      }
    />
  );
});

export default withTheme(App);

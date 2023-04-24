import { Suspense, useEffect, useState } from 'react';
import type { FC } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProviders';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';

import './styles/index.scss';
import { Modal } from 'shared/ui/Modal/Modal';

const App: FC = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        <button onClick={() => setIsOpen(true)}>toggle</button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          magnam quibusdam dolorem quae? Aliquid ex nisi fugiat deserunt autem
          recusandae quaerat obcaecati, odit enim omnis dignissimos numquam,
          velit, ullam dolorem.
        </Modal>
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};

export default App;

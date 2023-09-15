import {
  getRouteAbout,
  getRouteAdmin,
  getRouteProfile
} from '@/shared/const/router';
import { AppRouter } from './AppRouter';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { screen, waitForElementToBeRemoved } from '@testing-library/dom';
import { UserRole } from '@/entities/User';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    }))
  });
});

describe('AppRouter', () => {
  test('Страница должна отрендериться', async () => {
    componentRender(<AppRouter />, {
      route: getRouteAbout()
    });
    const page = await screen.findByTestId('AboutPage');
    expect(page).toBeInTheDocument();
  });

  test('Страница не найдена', async () => {
    componentRender(<AppRouter />, {
      route: '/asdasd'
    });
    const page = await screen.findByTestId('NotFoundPage');
    expect(page).toBeInTheDocument();
  });

  test('Редирект неавторизированного пользователя на главную', async () => {
    componentRender(<AppRouter />, {
      route: getRouteProfile('1')
    });
    // await waitForElementToBeRemoved(screen.getByTestId('PageLoader'));
    const page = await screen.findByTestId('MainPage');
    expect(page).toBeInTheDocument();
  });

  test('Доступ к закрытой странице для авторизованного пользователя', async () => {
    componentRender(<AppRouter />, {
      route: getRouteProfile('1'),
      initialState: {
        user: {
          _mounted: true,
          authData: {}
        }
      }
    });
    await waitForElementToBeRemoved(screen.getByTestId('PageLoader'));
    screen.debug();
    const page = await screen.findByTestId('ProfilePage');
    expect(page).toBeInTheDocument();
  });

  test('Доступ запрещен (отсутствует роль)', async () => {
    componentRender(<AppRouter />, {
      route: getRouteAdmin(),
      initialState: {
        user: {
          _mounted: true,
          authData: { id: '1', username: 'admin' }
        }
      }
    });
    const page = await screen.findByTestId('ForbiddenPage');
    expect(page).toBeInTheDocument();
  });

  test('Доступ разрешен (присутствует роль)', async () => {
    componentRender(<AppRouter />, {
      route: getRouteAdmin(),
      initialState: {
        user: {
          _mounted: true,
          authData: { roles: [UserRole.ADMIN] }
        }
      }
    });
    // await waitForElementToBeRemoved(screen.getByTestId('PageLoader'));
    const page = await screen.findByTestId('AdminPanelPage');
    expect(page).toBeInTheDocument();
  });
});

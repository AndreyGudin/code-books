import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import { ButtonTheme } from './const';

describe('Button', () => {
  test('has been rendered', () => {
    render(<Button>Test</Button>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  test('has theme class', () => {
    render(<Button theme={ButtonTheme.CLEAR}>Test</Button>);
    expect(screen.getByText('Test')).toHaveClass('clear');
    screen.debug();
  });
});

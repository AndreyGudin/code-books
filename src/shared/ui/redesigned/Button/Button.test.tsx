import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  test('has been rendered', () => {
    render(<Button>Test</Button>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  test('has theme class', () => {
    render(<Button variant="clear">Test</Button>);
    expect(screen.getByText('Test')).toHaveClass('clear');
    screen.debug();
  });
});

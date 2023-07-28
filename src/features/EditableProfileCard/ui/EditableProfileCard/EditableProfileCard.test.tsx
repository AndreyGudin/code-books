import { fireEvent, screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';

import { EditableProfileCard } from './EditableProfileCard';

describe('EditableProfileCard', () => {
  test('has been rendered', () => {
    componentRender(<EditableProfileCard />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

});

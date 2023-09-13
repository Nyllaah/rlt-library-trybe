import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <NotFound.tsx />', () => {
  test('a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<App />, { route: '/404error' });
    const notFoundMsg = screen.getByRole('heading', { name: 'Page requested not found' });
    expect(notFoundMsg).toBeVisible();
  });

  test('a página mostra a imagem com o texto alternativo', () => {
    renderWithRouter(<App />, { route: '/404error' });
    const image = screen.getByAltText(/Clefairy pushing buttons randomly with text I have no idea what i'm doing/i);

    expect(image).toBeVisible();
  });
});

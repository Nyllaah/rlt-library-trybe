import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const favTitle = 'Favorite Pokémon';
describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  test('O primeiro link deve ter o texto "Home"', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: 'Home' });

    expect(home).toBeInTheDocument();
  });

  test('O segundo link deve ter o texto "About"', () => {
    renderWithRouter(<App />);

    const about = screen.getByRole('link', { name: 'About' });

    expect(about).toBeInTheDocument();
  });

  test('O terceiro link deve ter o texto "Favorite Pokémon"', () => {
    renderWithRouter(<App />);

    const favoritePokemon = screen.getByRole('link', { name: favTitle });

    expect(favoritePokemon).toBeInTheDocument();
  });
});

describe('Teste se a aplicação é redirecionada para a página clicada', () => {
  test('a aplicação é redirecionada para a página inicial, na URL /, ao clicar no link Home da barra de navegação.', async () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: 'Home' });

    await userEvent.click(home);

    const title = await screen.findByText('Encountered Pokémon');

    expect(title).toBeInTheDocument();
  });

  test('e a aplicação é redirecionada para a página de "About", na URL /about, ao clicar no link About da barra de navegação.', async () => {
    renderWithRouter(<App />);

    const about = screen.getByRole('link', { name: 'About' });

    await userEvent.click(about);

    const title = await screen.findByRole('heading', { name: 'About Pokédex' });

    expect(title).toBeInTheDocument();
  });

  test('a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação.', async () => {
    renderWithRouter(<App />);

    const favoritePokemon = screen.getByRole('link', { name: favTitle });

    await userEvent.click(favoritePokemon);

    const title = await screen.findByRole('heading', { name: favTitle });

    expect(title).toBeInTheDocument();
  });

  test('a aplicação é redirecionada para a página "Not Found" ao entrar em uma URL desconhecida.', () => {
    renderWithRouter(<App />, { route: '/teste' });

    const title = screen.getByRole('heading', { name: 'Page requested not found' });

    expect(title).toBeInTheDocument();
  });
});

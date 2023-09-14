import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.tsx />', () => {
  test('é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByAltText('Pikachu sprite');

    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokemonImg).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });

  test('o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes desse Pokémon', () => {
    renderWithRouter(<App />);
    const moreBtn = screen.getByRole('link', { name: 'More details' });

    expect(moreBtn).toBeVisible();
    expect(moreBtn).toHaveAttribute('href', '/pokemon/25');
  });

  test('ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', async () => {
    renderWithRouter(<App />);
    const moreBtn = screen.getByRole('link', { name: 'More details' });

    await userEvent.click(moreBtn);
    const pokemonTitle = screen.getByText('Pikachu Details');
    expect(pokemonTitle).toBeVisible();
  });

  test('existe um ícone de estrela nos Pokémon favoritados', async () => {
    renderWithRouter(<App />, { route: '/pokemon/25' });
    const favCheckbox = screen.getByLabelText('Pokémon favoritado?');

    await userEvent.click(favCheckbox);

    const favStar = await screen.findByAltText('Pikachu is marked as favorite');
    expect(favStar).toBeVisible();
  });
});

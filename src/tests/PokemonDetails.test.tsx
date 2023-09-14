import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.tsx />', () => {
  test('as informações detalhadas do Pokémon selecionado são mostradas na tela', async () => {
    renderWithRouter(<App />);
    const moreBtn = screen.getByRole('link', { name: 'More details' });

    await userEvent.click(moreBtn);

    const pokemonTitle = await screen.findByText('Pikachu Details');
    expect(pokemonTitle).toBeVisible();
    expect(moreBtn).not.toBeInTheDocument();

    const summaryTitle = screen.getByRole('heading', { name: 'Summary' });
    expect(summaryTitle).toBeVisible();

    const summaryText = screen.getByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.');
    expect(summaryText).toBeVisible();
  });

  test('existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />, { route: '/pokemon/25' });
    const locTitle = screen.getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(locTitle).toBeVisible();

    const locations = screen.queryAllByAltText('Pikachu location');
    expect(locations).toHaveLength(2);
    expect(locations[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');

    const locName = screen.getByText('Kanto Viridian Forest');
    expect(locName).toBeVisible();
  });

  test('o usuário pode favoritar um Pokémon por meio da página de detalhes', async () => {
    renderWithRouter(<App />, { route: '/pokemon/25' });
    const favCheckbox = screen.getByLabelText('Pokémon favoritado?');
    const favPokemonLink = screen.getByRole('link', { name: 'Favorite Pokémon' });

    expect(favCheckbox).toBeVisible();

    await userEvent.click(favCheckbox);
    await userEvent.click(favPokemonLink);

    const favPokemon = await screen.findByTestId('pokemon-name');
    expect(favPokemon).toHaveTextContent('Pikachu');
  });
});

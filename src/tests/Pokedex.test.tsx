import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemonList from '../data';
import renderWithRouter from '../renderWithRouter';

describe('este o componente <Pokedex.tsx />', () => {
  test('a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const title = screen.getByText('Encountered Pokémon');
    expect(title).toBeVisible();
  });

  test('é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado:', () => {
    renderWithRouter(<App />);

    pokemonList.forEach(async (pokemon, index) => {
      const currentPokemon = screen.getByTestId('pokemon-name');
      const nextBtn = screen.getByTestId('next-pokemon');
      expect(nextBtn).toBeVisible();
      expect(currentPokemon).toHaveTextContent(pokemon.name);
      await userEvent.click(nextBtn);
      const nextPokemon = await screen.findByTestId('pokemon-name');
      expect(nextPokemon).toHaveTextContent(pokemonList[index + 1].name);
    });
  });
});

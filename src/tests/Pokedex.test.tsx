import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemonList from '../data';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../pages';

describe('este o componente <Pokedex.tsx />', () => {
  test('a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const title = screen.getByText('Encountered Pokémon');
    expect(title).toBeVisible();
  });

  test('é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', async () => {
    renderWithRouter(<Pokedex
      pokemonList={
      [pokemonList[0], pokemonList[1]]
}
      favoritePokemonIdsObj={ { 25: false, 4: false } }
    />);

    const nextBtn = screen.getByTestId('next-pokemon');
    const currentPokemon = screen.getByTestId('pokemon-name');

    expect(nextBtn).toBeVisible();
    expect(nextBtn).toHaveTextContent('Próximo Pokémon');

    expect(currentPokemon).toHaveTextContent(pokemonList[0].name);
    await userEvent.click(nextBtn);
    expect(currentPokemon).toHaveTextContent(pokemonList[1].name);
    await userEvent.click(nextBtn);
    expect(currentPokemon).toHaveTextContent(pokemonList[0].name);
  });

  test('é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemons = screen.queryAllByTestId('pokemon-name');

    expect(pokemons).toHaveLength(1);
  });

  const pokemonTypeList:string[] = [];
  pokemonList.map((pokemon) => {
    const isInTheList = pokemonTypeList.find((type) => type === pokemon.type);
    return !isInTheList && pokemonTypeList.push(pokemon.type);
  });

  test('Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    pokemonTypeList.forEach((type) => {
      const button = screen.getByRole('button', { name: type });
      expect(button).toBeInTheDocument();
    });
  });

  // test.each(pokemonTypeList)('Pokédex tem o botão de filtro', (i) => {
  //   const button = screen.getByRole('button', { name: i });
  //   expect(button).toBeInTheDocument();
  // });
});

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemonList from '../data';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../pages';

describe('teste o componente <Pokedex.tsx />', () => {
  test('a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { name: 'Encountered Pokémon' });
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

  let pokemonTypeList:string[] = ['All'];
  pokemonList.map((pokemon) => {
    const isInTheList = pokemonTypeList.find((type) => type === pokemon.type);
    return !isInTheList && pokemonTypeList.push(pokemon.type);
  });

  test.each(pokemonTypeList)('Pokédex tem o botão de filtro "%s"', (i) => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: i });
    expect(button).toBeInTheDocument();
  });

  test('teste', () => {
    renderWithRouter(<App />);
    const buttons = screen.queryAllByTestId('pokemon-type-button');
    expect(buttons).toHaveLength(7);
  });

  pokemonTypeList = pokemonTypeList.filter((type) => type !== 'All');

  test.each(pokemonTypeList)('Após a seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon do tipo "%s"', async (type) => {
    renderWithRouter(<App />);

    const typeBtn = screen.getByRole('button', { name: type });
    const currentPokemonType = screen.getByTestId('pokemon-type');
    const allBtn = screen.getByRole('button', { name: 'All' });

    await userEvent.click(typeBtn);
    expect(allBtn).toBeVisible();
    expect(currentPokemonType).toHaveTextContent(type);
  });

  test('clique All reseta', async () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: 'All' });
    const typeBtn = screen.getByRole('button', { name: 'Fire' });

    await userEvent.click(typeBtn);

    const currentPokemonType = screen.getByTestId('pokemon-type');
    expect(currentPokemonType).toHaveTextContent('Fire');

    await userEvent.click(allBtn);

    expect(currentPokemonType).toHaveTextContent('Electric');
  });
});

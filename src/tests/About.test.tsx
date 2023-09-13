import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('a página contém as informações sobre a Pokédex', () => {
  test('a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<App />, { route: '/about' });

    const title = screen.getByRole('heading', { name: 'About Pokédex' });

    expect(title).toBeVisible();
  });

  test('a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<App />, { route: '/about' });

    const p1 = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon.');
    const p2 = screen.getByText('One can filter Pokémon by type, and see more details for each one of them.');

    // const pElements = screen.getAllByText(
    //   (/This application simulates a Pokédex, a digital encyclopedia containing all Pokémon./i)
    //     || (/One can filter Pokémon by type, and see more details for each one of them./i),
    // );

    expect(p1).toBeVisible();
    expect(p2).toBeVisible();
    // expect(pElements).toHaveLength(2);
  });

  test('página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<App />, { route: '/about' });

    const image = screen.getByAltText('Pokédex');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

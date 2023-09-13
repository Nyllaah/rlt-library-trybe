import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Ao favoritar a partir da página de detalhes', () => {
  test('É exibida na tela a mensagem "No favorite pokemon found" caso a pessoa não tenha Pokémon favorito.', () => {
    renderWithRouter(<App />, { route: '/favorites' });

    const emptyMsg = screen.getByText('No favorite Pokémon found');

    expect(emptyMsg).toBeVisible();
  });

  test('Apenas são exibidos os Pokémon favoritados.', async () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
    await userEvent.click(moreDetailsLink);

    const favCheckbox = await screen.findByLabelText('Pokémon favoritado?');
    await userEvent.click(favCheckbox);

    const favorites = screen.getByRole('link', { name: 'Favorite Pokémon' });
    await userEvent.click(favorites);

    const favPokemon = screen.getByText('Pikachu');
    expect(favPokemon).toBeInTheDocument();
    // como testar se x pokemon nao está no documento?
  });
});

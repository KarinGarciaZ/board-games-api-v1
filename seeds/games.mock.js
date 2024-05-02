const gamesMock = [
  {
    familyId: 1,
    brandId: 1,
    name: 'Sequence',
    description: `Play a card from your hand, and place a chip on a corresponding space on the game board. When you have five in a row, it's a SEQUENCE. Block your opponents or remove their chips. The first player or team with the required number of SEQUENCES wins!`,
    age_recommended: 7,
    play_time: 30,
    min_players: 2,
    max_players: 12,
    rating: 0.0,
    rating_voters: 0,
  },
  {
    familyId: 2,
    brandId: 9,
    name: 'UNO',
    description: 'El juego clásico de cartas de hacer coincidir números y colores. PARA TODA LA FAMILIA - Los jugadores compiten en turnos haciendo coincidir las cartas que tienen en la mano con el color o el número de la carta que aparece en la parte superior de la baraja.',
    age_recommended: 7,
    play_time: 10,
    min_players: 2,
    max_players: 10,
    rating: 0.0,
    rating_voters: 0,
  },
  {
    familyId: 3,
    brandId: 2,
    name: 'Dixit',
    description: 'Dixit is the lovingly illustrated game of creative guesswork, where your imagination unlocks the tale. In this award-winning board game, players will use the beautiful imagery on their cards to bluff their opponents and guess which image matches the story.',
    age_recommended: 8,
    play_time: 30,
    min_players: 3,
    max_players: 6,
    rating: 0.0,
    rating_voters: 0,
  },
  {
    familyId: 4,
    brandId: 2,
    name: 'Splendor',
    description: 'Splendor es un juego de recolección de fichas y desarrollo de cartas. Los jugadores son comerciantes del Renacimiento que intentan comprar minas de gemas, medios de transporte y tiendas, con el fin de adquirir la mayor cantidad de puntos de prestigio.',
    age_recommended: 10,
    play_time: 40,
    min_players: 2,
    max_players: 4,
    rating: 0.0,
    rating_voters: 0,
  },
  {
    familyId: 5,
    brandId: 6,
    name: 'Mapominoes',
    description: `It's like dominoes but with maps, as you build a map of Europe, by connecting countries that share a common border. Stay one step ahead of your opponents, as you race to be the first player to play all your country cards on the table and win this geography game.`,
    age_recommended: 8,
    play_time: 30,
    min_players: 2,
    max_players: 5,
    rating: 0.0,
    rating_voters: 0,
  },
  {
    familyId: 6,
    brandId: 5,
    name: 'Catan',
    description: `Settlers of Catan is a strategy board game involving smart resource management. Your goal in Settlers of Catan is to reach ten victory points. You earn victory points from building settlements, cities, and development cards; having the longest road and the largest army.`,
    age_recommended: 10,
    play_time: 60,
    min_players: 2,
    max_players: 4,
    rating: 0.0,
    rating_voters: 0,
  },
  {
    familyId: 12,
    brandId: 9,
    name: 'Phase 10',
    description: `JUEGO en el que ganas cuando completas las diez fases, que varían entre dos conjuntos de tres, una corrida de siete o siete cartas del mismo color. SORPRESA con los objetivos cambiantes de cada fase. Los jugadores deben completar la etapa antes de avanzar a la siguiente ronda.`,
    age_recommended: 7,
    play_time: 60,
    min_players: 2,
    max_players: 6,
    rating: 0.0,
    rating_voters: 0,
  },
  {
    familyId: 2,
    brandId: 9,
    name: 'DOS',
    description: 'Like UNO, the object of DOS Second Edition is to be the first player to get rid of all your cards, but now there are two discard piles and players are allowed to add two cards together to help empty their hand faster.',
    age_recommended: 7,
    play_time: 10,
    min_players: 2,
    max_players: 4,
    rating: 0.0,
    rating_voters: 0,
  },
  {
    familyId: 2,
    brandId: 9,
    name: 'UNO dare',
    description: 'The familiar fun race to yell “UNO!” comes with wild, new choices! While playing the color and numbers matching game, you’re faced with a decision: draw extra cards or take a dare! Dare cards come in 3 categories: Family, Show-Off and Daredevil',
    age_recommended: 7,
    play_time: 10,
    min_players: 2,
    max_players: 10,
    rating: 0.0,
    rating_voters: 0,
  },
  {
    familyId: 1,
    brandId: 2,
    name: 'Sequence for kids',
    description: 'Juega una carta de animal de tu mano, coloca una ficha en el tablero… cuando consigas 4 en fila, ¡es SEQUENCE',
    age_recommended: 3,
    play_time: 10,
    min_players: 2,
    max_players: 4,
    rating: 0.0,
    rating_voters: 0,
  },
  {
    familyId: 7,
    brandId: 4,
    name: 'Unstable Unicorns',
    description: `Unstable Unicorns is a dedicated deck card game designed and illustrated by Ramy Badie that was proposed on Kickstarter. The goal of the game is to control seven unicorn cards by playing unicorns and upgrade cards, and inhibiting other players with downgrades and other special cards. The game won the 2019 Toy Association's Toy of The Year Awards' People's Choice Award.`,
    age_recommended: 8,
    play_time: 45,
    min_players: 2,
    max_players: 8,
    rating: 3.9,
    rating_voters: 52,
  },
  {
    familyId: 8,
    brandId: 4,
    name: 'Happy Little Dinosaurs',
    description: `Unstable Unicorns is a dedicated deck card game designed and illustrated by Ramy Badie that was proposed on Kickstarter. The goal of the game is to control seven unicorn cards by playing unicorns and upgrade cards, and inhibiting other players with downgrades and other special cards. The game won the 2019 Toy Association's Toy of The Year Awards' People's Choice Award.`,
    age_recommended: 8,
    play_time: 45,
    min_players: 2,
    max_players: 4,
    rating: 4.2,
    rating_voters: 27,
  },
  {
    familyId: 9,
    brandId: 7,
    name: 'Ticket to Ride',
    description: `Ticket to Ride is a series of railway-themed Eurogames designed by Alan R. Moon, the first of which was released in 2004 by Days of Wonder. The game has sold over 10 million copies, amounting to a total estimated revenue of over $400 million (USD). Days of Wonder has released electronic versions of the board games in the series, as well as "Ticket to Ride"-themed card games and puzzles.`,
    age_recommended: 8,
    play_time: 45,
    min_players: 2,
    max_players: 5,
    rating: 4.1,
    rating_voters: 87,
  },
  {
    familyId: 10,
    brandId: 8,
    name: 'Exploding Kittens',
    description: `Exploding Kittens is a highly-strategic, kitty powered version of Russian Roulette. Players draw cards until somebody draws an Exploding Kitten, at which point they explode and are out of the game. To avoid exploding, they can defuse the kitten with a laser pointer or catnip sandwich OR use powerful action cards to move or avoid the Exploding Kitten. Betray your friends. Try not to explode. The last player left alive wins.`,
    age_recommended: 7,
    play_time: 15,
    min_players: 2,
    max_players: 5,
    rating: 4.7,
    rating_voters: 74,
  },
  {
    familyId: 11,
    brandId: 2,
    name: 'Spot it',
    description: `Pon a prueba tus habilidades de observación y perfecciona tus reflejos con la galardonada jugabilidad de Spot It, un juego de opciones ultrarrápidas para un grupo de dos a ocho jugadores. Con docenas de premios y posibles versiones casadas con un juego elegante, Spot It se ha convertido en un fenómeno global. El juego funciona en una simple mecánica: cincuenta y cinco cartas circulares, cada una de las cuales cuenta con una serie de símbolos y tiene exactamente uno de esos símbolos en común con cualquier otra carta en la baraja. Con cinco minijuegos distintos, puedes estar seguro de que Spot It será diferente cada vez que juegas, y porque siempre es tu turno, nunca habrá tiempo de inactividad`,
    age_recommended: 6,
    play_time: 15,
    min_players: 2,
    max_players: 8,
    rating: 4.3,
    rating_voters: 98,
  },
  {
    familyId: 6,
    brandId: 5,
    name: 'Struggle For Catan',
    description: `The game consists of 110 cards. There are 5 different resource cards: brick, lumber, grain, wool, and ore (A) as well as building cards for roads, settlements (back: city), and city expansions (B). You need the resource cards to build; for example, building a road costs 1 lumber and 1 brick, and building a knight costs 1 ore, 1 wool, and 1 grain. After paying the resources, you may place the corresponding building card in front of you.`,
    age_recommended: 8,
    play_time: 45,
    min_players: 2,
    max_players: 4,
    rating: 4.7,
    rating_voters: 128,
  },
  {
    familyId: 6,
    brandId: 5,
    name: 'Catan Junior',
    description: `CATAN Junior takes families with children ages 6 and up to a place quite different from Catan as we know it. There are no "settlers" around here. Instead, the players slip into the role of pirates who build their hideouts - called pirates' lairs - all over the islands and set sail to find new places and build more pirates' lairs there.`,
    age_recommended: 6,
    play_time: 30,
    min_players: 2,
    max_players: 4,
    rating: 4.3,
    rating_voters: 18,
  },
  {
    familyId: 6,
    brandId: 5,
    name: 'Catan StarFarers',
    description: `Finally, a jump to the stars has succeeded! It is the middle of the 3rd millennium. You and your fellow Catanians travel in spaceships to distant planetary systems in search of more resources. Along the way, you befriend alien civilizations who might become valued trading partners.`,
    age_recommended: 14,
    play_time: 120,
    min_players: 3,
    max_players: 4,
    rating: 3.7,
    rating_voters: 20,
  },
  {
    familyId: 6,
    brandId: 5,
    name: 'Catan Dice Game',
    description: `In the dice game version of CATAN, you also build settlements, roads, cities, and knights. Here, however, building doesn't mean placing wooden or plastic game pieces on a game board. Instead, each player has a sheet depicting a smaller version of the island of Catan. You build by filling in the respective symbols for roads, knights, settlements, and cities.`,
    age_recommended: 7,
    play_time: 30,
    min_players: 1,
    max_players: 4,
    rating: 3.6,
    rating_voters: 26,
  },
  {
    familyId: 6,
    brandId: 5,
    name: 'Catan Logic Puzzle',
    description: `In the CATAN Logic Puzzle, players use logic, organization, and critical thinking skills to discover paths to prosperity as they connect mines, farms, and lumber camps to settlements and cities around the island. Trade routes must wind through terrain, avoid obstacles and (of course) avoid the dreaded robber!`,
    age_recommended: 8,
    play_time: 40,
    min_players: 1,
    max_players: 1,
    rating: 3.9,
    rating_voters: 54,
  },
];

module.exports = {
  gamesMock
}
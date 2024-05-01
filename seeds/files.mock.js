const filesMock = [
  {
    name: 'Sequence.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 100000,
    is_main: false
  },
  {
    name: 'Sequence2.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 1000,
    is_main: true
  },
  {
    name: 'Sequence3.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 90000,
    is_main: false
  },
  {
    name: 'UNO.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 100000,
    is_main: true
  },
  {
    name: 'Dixit.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 100000,
    is_main: true
  },
  {
    name: 'Dixit2.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 100000,
    is_main: false
  },
  {
    name: 'Splendor.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 100000,
    is_main: true
  },
  {
    name: 'Mapominoes.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 100000,
    is_main: true
  },
  {
    name: 'Mapominoes2.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 10000,
    is_main: false
  },
  {
    name: 'Mapominoes3.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 120000,
    is_main: false
  },
  {
    name: 'Catan.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 1000300,
    is_main: true
  },
  {
    name: 'Unstable Unicorns.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 100200,
    is_main: true
  },
  {
    name: 'Happy Little Dinosaurs.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 10300,
    is_main: true
  },
  {
    name: 'Happy Little Dinosaurs2.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 103030,
    is_main: false
  },
  {
    name: 'Ticket to Ride.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 100000,
    is_main: true
  },
  {
    name: 'Exploding Kittens.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 100000,
    is_main: true
  },
  {
    name: 'Spot It.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 100000,
    is_main: true
  },
  {
    name: 'Spot It2.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 1000200,
    is_main: false
  },
  {
    name: 'Phase 10.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 100000,
    is_main: false
  },
  {
    name: 'Phase 10-2.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 100000,
    is_main: true
  },
];

module.exports = {
  filesMock
}
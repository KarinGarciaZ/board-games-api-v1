const filesMock = [
  { 
    name: 'Sequence.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 100000,
    isMain: false
  },
  { 
    name: 'Sequence2.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 1000,
    isMain: true
  },
  { 
    name: 'Sequence3.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 90000,
    isMain: false
  },
  { 
    name: 'UNO.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 100000,
    isMain: true
  },
  { 
    name: 'Dixit.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 100000,
    isMain: true
  },
  { 
    name: 'Dixit2.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 100000,
    isMain: false
  },
  { 
    name: 'Splendor.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 100000,
    isMain: true
  },
  { 
    name: 'Mapominoes.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 100000,
    isMain: true
  },
  { 
    name: 'Mapominoes2.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 10000,
    isMain: false
  },
  { 
    name: 'Mapominoes3.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 120000,
    isMain: false
  },
  { 
    name: 'Catan.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 1000300,
    isMain: true
  },
  { 
    name: 'Unstable Unicorns.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 100200,
    isMain: true
  },
  { 
    name: 'Happy Little Dinosaurs.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 10300,
    isMain: true
  },
  { 
    name: 'Happy Little Dinosaurs2.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 103030,
    isMain: false
  },
  { 
    name: 'Ticket to Ride.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 100000,
    isMain: true
  },
  { 
    name: 'Exploding Kittens.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 100000,
    isMain: true
  },
  { 
    name: 'Spot It.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 100000,
    isMain: true
  },
  { 
    name: 'Spot It2.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 1000200,
    isMain: false
  },
  { 
    name: 'Phase 10.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 100000,
    isMain: false
  },
  { 
    name: 'Phase 10-2.jpg',
    url: 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
    type: 'image/jpeg',
    size: 100000,
    isMain: true
  },
];

module.exports = {
  filesMock
}
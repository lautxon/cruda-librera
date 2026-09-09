/* =========================
   CONFIGURACIÓN
   ========================= */
const CONFIG = {
  whatsapp: "5491100000000",
  email: "hola@crudalibrera.com",
  mpPaymentLink: "",
  formEndpoint: "",
};

/* =========================
   LIBROS — stock en clasificación
   ========================= */
const BOOKS = [
  { title: "La música del universo", author: "AA.VV.", publisher: "Siglo XXI Editores", price: 17500, state: "very-good", stateLabel: "Muy buen estado" },
  { title: "Pasiones terrenas", author: "Maximiliano Crespi", publisher: "Taurus", price: 19999, state: "good", stateLabel: "Buen estado" },
  { title: "El negro corazón del crimen", author: "Marcelo Figueras", publisher: "Alfaguara", price: 38999, state: "excellent", stateLabel: "Estado excelente" },
  { title: "Una vida más verdadera", author: "Inés Garland", publisher: "Alfaguara", price: 24999, state: "very-good", stateLabel: "Muy buen estado" },
  { title: "Las teorías salvajes", author: "Pola Oloixarac", publisher: "Literatura Random House", price: 29000, state: "fair", stateLabel: "Usado aceptable" },
  { title: "Amores mutantes", author: "Leticia Frenkel", publisher: "notanpüan", price: 20500, state: "excellent", stateLabel: "Estado excelente" },
  { title: "Prohibido morir aquí", author: "Elizabeth Taylor", publisher: "La bestia equilatera", price: 21000, state: "good", stateLabel: "Buen estado" },
  { title: "Las chicas no lloran", author: "Olivia Gallo", publisher: "Tenemos las máquinas", price: 17600, state: "very-good", stateLabel: "Muy buen estado" },
  { title: "El forastero misterioso", author: "Mark Twain", publisher: "Tusquets", price: 11000, state: "worn", stateLabel: "Usado con marcas" },
  { title: "Perdidas en la noche", author: "Fabián Martínez Siccardi", publisher: "Tusquets", price: 12500, state: "good", stateLabel: "Buen estado" },
  { title: "Un reino demasiado breve", author: "Mauro Libertella", publisher: "Literatura Random House", price: 25499, state: "very-good", stateLabel: "Muy buen estado" },
  { title: "La lengua alemana", author: "Julieta Mortati", publisher: "emecé notanpüan", price: 22900, state: "fair", stateLabel: "Usado aceptable" },
  { title: "Variaciones enigma", author: "Andrés Aciman", publisher: "Alfaguara", price: 34599, state: "excellent", stateLabel: "Estado excelente" },
  { title: "Sobre los artistas Vol. 1", author: "John Berger", publisher: "GG", price: 39900, state: "good", stateLabel: "Buen estado" },
  { title: "Sobre los artistas Vol. 2", author: "John Berger", publisher: "GG", price: 39900, state: "good", stateLabel: "Buen estado" },
];

/* =========================
   BLOG — posts estáticos
   ========================= */
const BLOG_POSTS = [
  {
    date: "15 Nov 2025",
    title: "La dedicatoria que no era para quien lo leyó",
    excerpt: "Entre los libros que clasificamos esta semana apareció un ejemplar de \"La música del universo\" con una dedicatoria fechada en 1987. Dice: \"Para M., que siempre supo que el cosmos también canta\". Nunca vamos a saber quién fue M., ni quién le regaló el libro, ni por qué terminó acá. Pero la tinta todavía se lee. Y eso, en un libro usado, es un regalo.",
    author: "— La librera"
  },
  {
    date: "8 Nov 2025",
    title: "Por qué nos gustan los libros con marcas",
    excerpt: "Hay lectores que prefieren un libro impecable. Nosotros no. Nos gustan los que tienen una raya en la tapa, los que amarillean en los bordes, los que tienen una firma en la página de guarda. Un libro sin marcas es un libro que nadie amó lo suficiente como para dejarle huella. Acá celebramos esas huellas.",
    author: "— La librera"
  },
  {
    date: "1 Nov 2025",
    title: "Historia de un \"Forastero misterioso\" muy viajero",
    excerpt: "El ejemplar de Mark Twain que tenemos en el catálogo pasó por tres manos antes de llegar a nosotros. La primera lo compró en Montevideo en 1974. La segunda lo llevó a Barcelona. La tercera lo trajo de vuelta. Ahora está en nuestra mesa, esperando la cuarta. Los libros viajan más que nosotros.",
    author: "— La librera"
  },
  {
    date: "22 Oct 2025",
    title: "Manual para comprar usados sin que te engañen",
    excerpt: "La semana pasada publicamos nuestro Manual de tasación. Es una guía para que cualquiera pueda evaluar un libro usado antes de comprarlo o venderlo. Creemos que el oficio de librero no debería ser un misterio: compartir cómo se tasan los libros es también defender a los lectores.",
    author: "— La librera"
  },
];

/* =========================
   BUSCADOS — iniciales (se suman los de localStorage)
   ========================= */
const BUSCADOS_INICIALES = [
  {
    name: "Martín",
    email: "martin.lectores@email.com",
    book: "Los detectives salvajes, Roberto Bolaño",
    comment: "Busco la edición original de Alfaguara (1998). Pago bien si está en buen estado.",
    date: "10 Nov 2025"
  },
  {
    name: "Clara",
    email: "clara.b@email.com",
    book: "La invención de Morel, Adolfo Bioy Casares",
    comment: "Cualquier edición, siempre que esté completo. Es para un regalo.",
    date: "5 Nov 2025"
  },
  {
    name: "Diego",
    email: "diego.p@email.com",
    book: "Respiración artificial, Ricardo Piglia",
    comment: "Busco la primera edición de Editorial Belgrano (1980). Si la tenés, avísame.",
    date: "28 Oct 2025"
  },
];

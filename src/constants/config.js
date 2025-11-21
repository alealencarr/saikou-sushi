

  export const PATHS = { 
  drinks: 'https://placehold.co/400x600/1a1a1a/555?text=Drink+' ,
  images: '2dutrafachada.png', // Placeholder
  food: 'https://placehold.co/800x600/222/888?text=Prato+' };

export const dataCardapio = 
{
cardapioNameDefault: 'Cardapio.pdf',
pdfUrl: 'Cardapio.pdf',
cardapioName: "Cardapio.pdf",
cardapioDestaque: [],
pathBase: "/cardapio/"
}

for (let i = 1; i <= 39; i++) {
    dataCardapio.cardapioDestaque.push({
        nome: "",
        descricao: "", 
        altText: `Prato do cardápio Saikou Sushi ${i}`,
        imagem: dataCardapio.pathBase + `prato${i}.jpeg`
    });
}

export const generateWhatsAppLink = (phone, texto) => {
  
  const cleanPhone = phone.replace(/\D/g, '');
  const fullPhone = cleanPhone.length === 11 ? `55${cleanPhone}` : cleanPhone;
  const message = encodeURIComponent(`Olá! Gostaria de fazer ${texto == "SAIKOU VELEIROS" || texto == "SAIKOU DUTRA" ? "um pedido" : "uma reserva"}.`);
  return `https://wa.me/${fullPhone}?text=${message}`;
};

 

export  const locationsData = [
    {
      name: 'SAIKOU VELEIROS',
      address: 'Praça Nicolau Aranha Pachêco, 64 – Jardim Ipanema, São Paulo – SP, 04784-280',
      phone: '(11) 96927-7577',
      img: 'veleirosfachada.png',
      mapLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Praça Nicolau Aranha Pachêco, 64 – Jardim Ipanema, São Paulo – SP, 04784-280')}`,
      videos: [
      "/videos/veleiros/video1.mp4",  
      "/videos/veleiros/video2.mp4",
      "/videos/veleiros/video3.mp4",
      "/videos/veleiros/video4.mp4",
      "/videos/veleiros/video5.mp4",
       "/videos/veleiros/video6.mp4"
    ]
    },
    {
      name: 'SAIKOU DUTRA',
      address: 'Rua Padre José Garzotti, 342 – Cidade Dutra, São Paulo – SP, 04806-000',
      phone: '(11) 93334-4060',
      img: 'dutrafachada.png',
      mapLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Rua Padre José Garzotti, 342 – Cidade Dutra, São Paulo – SP, 04806-000')}`,
      videos: [
      "/videos/dutra/video1.mp4",  
      "/videos/dutra/video2.mp4",
      "/videos/dutra/video3.mp4"
    ]
    },
  ];

  export const dataDrinks = 
  {
    drinks: [],
    pathBase: "/drinks/",
    nomesDrinks : [
    "Sakura Kiss", "Tokyo Mule", "Shogun's G&T", "Lychee Martini", "Yuzu Sour",
    "Wasabi Blood Mary", "Matcha Highball", "Geisha's Whisper"
],
descDrinks: [
    "Uma mistura delicada de saquê, flor de cerejeira e um toque de licor.",
    "Nossa versão do clássico, com gengibre fresco, yuzu e vodka premium.",
    "Gin tônica reinventado com botânicos japoneses e pepino.",
    "Elegante, doce e perfeitamente equilibrado. Um ícone do bar.",
    "Refrescante e cítrico, o equilíbrio perfeito entre o doce e o azedo.",
    "Para os corajosos: um toque picante e complexo no clássico.",
    "Energético e suave, com o sabor autêntico do matcha cerimonial.",
    "Um coquetel suave e aromático com shochu, pêssego e jasmim."
]
  };
 
for (let i = 1; i <= 18; i++) {
    dataDrinks.drinks.push({
        nome: dataDrinks.nomesDrinks[i % dataDrinks.nomesDrinks.length] || `Drink ${i}`,
        descricao: dataDrinks.descDrinks[i % dataDrinks.descDrinks.length] || "Descrição do drink.",
        altText: `Drink exclusivo Saikou Sushi ${i}`,  
        imagem: `${dataDrinks.pathBase}drink${i}.jpeg`
    
    });
}
 
export const videos360Data = [
  {
    id: 'dutra',
    name: 'Unidade Dutra - Tour 360º',
    videoSrc: 'SaikouDutra360.mp4',
    posterSrc: 'https://saikousushi.com.br/wp-content/uploads/2024/04/Captura-de-Tela-2024-04-20-as-15.21.11.png',
  },
  {
    id: 'veleiros',
    name: 'Unidade Veleiros - Tour 360º',
    videoSrc: 'SaikouVeleiros360.mp4',
    posterSrc: 'https://saikousushi.com.br/wp-content/uploads/2024/04/Captura-de-Tela-2024-04-20-as-15.21.29.png',
  },
];

export const generateWhatsAppLinkRodizio = (phone, locationName) => {
  const cleanPhone = phone.replace(/\D/g, '');
  const fullPhone = cleanPhone.length === 11 ? `55${cleanPhone}` : cleanPhone;
  const message = encodeURIComponent(`Olá! Gostaria de pedir o rodízio premium em casa.`);
  return `https://wa.me/${fullPhone}?text=${message}`;
};
 
export const IFOOD_LINKS = {
  VELEIROS: "https://www.ifood.com.br/delivery/sao-paulo-sp/saikou-sushi-express---comida-japonesa-jardim-ipanema/7db279b1-ac0a-4cbd-ad5a-fe90c3da4027?utm_medium=share",
  DUTRA: "https://www.ifood.com.br/delivery/sao-paulo-sp/saikou-sushi-dutra---comida-japonesa-cidade-dutra/081afe41-1079-468b-84b8-8fba950daf48?utm_medium=share"
};

export const SOCIAL = {
  instagram: 'https://www.instagram.com/saikou_sushi',  
  instagramHandle: '@saikou_sushi',  
};
export const navLinks = [
  { name: 'INICIO', href: '#sobre' },
  { name: 'PRATOS', href: '#cardapio' },
  { name: 'DRINKS', href: '#drinks' },
  { name: 'UNIDADES', href: '#locations' },
  { name: 'AVALIAÇÕES', href: '#reviews' },
  { name: 'TOUR 360°', href: '#visualizacao-360' },
  { name: 'DELIVERY', href: '#delivery' },
  { name: 'CONTATO', href: '#contato' },
];

export const FACEBOOK_LINKS = [
  { 
    name: 'Facebook Veleiros', 
    href: 'https://www.facebook.com/saikouveleiros/?locale=pt_BR', 
    handle: 'saikouveleiros' 
  },
  { 
    name: 'Facebook Dutra', 
    href: 'https://www.facebook.com/saikoucidadedutra/#', 
    handle: 'saikoucidadedutra' 
  },
];
 
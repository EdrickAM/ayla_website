document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    const posts = {
      "1": {
        title: "Viagem Cultural no Rio de Janeiro: Como Viver a Cidade Como um Carioca",
        date: "07 de fevereiro de 2025",
        image: "assets/images/blog/post1/image1.jpg",
        content: `
          <p>O Rio de Janeiro sempre me pareceu mais um estado de espírito do que uma cidade. Há algo na maneira como o sol abraça os morros, na cadência do samba que escapa de um bar qualquer, no jeito despreocupado e vibrante com que os cariocas ocupam as ruas. Para quem chega de fora, pode parecer difícil entender esse ritmo. Mas há um segredo: para viver o Rio como um verdadeiro carioca, é preciso sentir, antes de tudo, o pulsar da cidade.</p>
          
          <h2>O Rio além do cartão-postal</h2>
          <p>A primeira coisa que aprendi ao explorar o Rio de Janeiro foi que ele não é feito apenas de cartões-postais. Sim, o Cristo Redentor, o Pão de Açúcar e as praias de Copacabana e Ipanema são lugares mágicos, mas há um Rio invisível aos olhos apressados. Esse Rio mora nas esquinas do bairro de Santa Teresa, nos botequins escondidos da Lapa, no aroma do café passado na padaria da esquina.</p>
          
          <h2>Santa Teresa: O Bairro das Artes e da Boemia</h2>
          <p>Santa Teresa é um dos bairros mais autênticos do Rio. Andar pelas ruas de paralelepípedos é como caminhar em uma tela impressionista, com casarões antigos, ateliês de artistas e pequenos cafés acolhedores...</p>
          <img src="https://unsplash.com/pt-br/fotografias/fotografia-de-alto-angulo-do-teleferico-Q8KGwGdDsW8" alt="Bondinho de Santa Teresa">
          
          <h2>A Magia das Praias: Mais do que um Cartão-Postal</h2>
          <p>Cariocas têm uma relação quase sagrada com o mar. Mas esqueça o clichê de turistas deitados o dia inteiro em Copacabana. Para viver a praia como um carioca, vá à Praia do Leme no começo da manhã e veja a mágica de um dia no Rio de Janeiro acontecer...</p>
          <img src="https://unsplash.com/pt-br/fotografias/mulher-nadando-na-fotografia-do-oceano-cCkheI30Jd4" alt="Mulher nadando no oceano">
          
          <h2>O Samba Como Linguagem da Alma</h2>
          <p>Nenhuma viagem cultural ao Rio estaria completa sem samba. Mas para viver essa experiência como um verdadeiro carioca, esqueça as grandes casas de show voltadas para turistas. Vá à Pedra do Sal em uma segunda-feira à noite e sinta o chão vibrar com a batida do tamborim...</p>
          
          <h2>A Gastronomia que Conta Histórias</h2>
          <p>Comer no Rio de Janeiro é viajar pelo mundo sem sair da cidade. Para viver essa experiência como um carioca, você precisa entender que comida não é só sabor; é memória, tradição, encontro...</p>
          <img src="https://unsplash.com/pt-br/fotografias/uma-pessoa-esta-derramando-uma-bebida-em-um-copo-FwgRFkU8BAU" alt="Bebida sendo servida">
          
          <h2>Bairros Menos Conhecidos, Mas Imperdíveis</h2>
          <p>Enquanto a maioria dos turistas se prende à Zona Sul, os cariocas sabem que o verdadeiro coração da cidade pulsa em outros cantos. Em Madureira, o berço do samba, você pode visitar a Portela e o Império Serrano...</p>
          
          <h2>A Conexão Entre o Morro e o Asfalto</h2>
          <p>Uma das peculiaridades do Rio é a relação entre as favelas e os bairros tradicionais. Comunidades como Vidigal e Santa Marta se tornaram símbolos de resistência e cultura...</p>
          
          <h2>Viaje com a Ayla e Viva o Rio Como um Carioca</h2>
          <p>Se você quer viver essa experiência sem preocupações, a Ayla cuida de tudo para você. Nossos pacotes para o Rio de Janeiro garantem que você conheça a cidade como um verdadeiro carioca, com roteiros exclusivos, experiências autênticas e um suporte completo...</p>
        `
      }
    };
  
    const article = document.getElementById("blog-article");
  
    if (posts[postId]) {
      article.innerHTML = `
        <h1>${posts[postId].title}</h1>
        <p>${posts[postId].date}</p>
        <img src="${posts[postId].image}" alt="Imagem do Post">
        <div>${posts[postId].content}</div>
      `;
    } else {
      article.innerHTML = "<h1>Post não encontrado</h1><p>Desculpe, esse artigo não está disponível.</p>";
    }
});
  
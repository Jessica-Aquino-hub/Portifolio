//Seletor da Seção About (section)
const about = document.querySelector('#about');

// Seletor da Seção Projects (Carrossel)
const swiperWrapper = document.querySelector('.swiper-wrapper');

// Seletor do Formulário
const formulario = document.querySelector('#formulario');

// Regex de validação do e-mail
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Função para buscar os dados do Perfil do GitHub
async function getAboutGithub() {
    try {
        const resposta = await fetch('https://api.github.com/users/Jessica-Aquino-hub');
        const perfil = await resposta.json();

        about.innerHTML = '';
        about.innerHTML = `
        <figure class="about-image">
            <img src ="${perfil.avatar_url}" alt="Foto do perfil - ${perfil.name}">
        </figure >

            <article class="about-content">
                <h2>Sobre mim</h2>
                <p>Sou uma desenvolvedora Full Stack apaixonada por criar experiências digitais incríveis.
                Com habilidades em diversas tecnologias, transformo ideias em código para construir soluções inovadoras.
                Meu objetivo é contribuir para projetos que impactem positivamente a vida das pessoas e impulsionem
                a inovação no mundo digital.</p>

                <p>Com uma abordagem colaborativa e orientada a resultados, estou sempre em busca de novos desafios e oportunidades para crescer como profissional.
                Se você está procurando uma desenvolvedora dedicada e apaixonada para fazer parte do seu próximo projeto, não hesite em entrar em contato comigo. Estou animada para colaborar e criar algo incrível juntos!</p>

                <div class="about-button-data">
                    <div class="buttones-container">
                        <a href="${perfil.html_url}" target="_blank" class="botao">GitHub</a>
                        <a href="#" target="_blank" class="botao-outline">Currículo</a>
                    </div>

                    <div class="data-container">
                        <div class="data-item">
                            <span class="data-number">100</span>
                            <span class="data-label">${perfil.followers}</span>
                        </div>
                        <div class="data-item">
                            <span class="data-number">${perfil.public_repos}</span>
                            <span class="data-label">Repositórios</span>
                        </div>
                    </div>
                </div>
            </article>
        `;
    } catch (error) {
        console.error("Erro ao buscar dados do GitHub: ", error);
    }
}

async function getProjectsGithub() {
    try {
        const resposta = await fetch('https://api.github.com/users/Jessica-Aquino-hub/repos?sort=updated&per_page=6');
        const repositorios = await resposta.json();
        swiperWrapper.innerHTML = '';

        // Objeto contendo a lista de logos das linguagens
        const linguagens = {
            'JavaScript': 'javascript',
            'TypeScript': 'typescript',
            'Python': 'python',
            'Java': 'java',
            'HTML': 'html',
            'CSS': 'css',
            'PHP': 'php',
            'C#': 'c#',
            'Go': 'go',
            'Kotlin': 'kotlin',
            'Swift': 'swift', // Corrigido 'switf'
            'C': 'c',
            'C++': 'c_plus', // Corrigido o espaço antes de 'c_plus'
            'GitHub': 'github',
        }

        repositorios.forEach(repositorio => {
            // Seleciona o nome da linguagem padrão do repositório
            const linguagem = repositorio.language || 'GitHub';

            // Seleciona o logo da linguagem padrão do repositório
            const logo = linguagens[linguagem] ?? linguagens['GitHub'];

            // Constrói a URL que aponta para o logo da linguagem padrão do repositório
            const urlLogo = `./assets/icons/languages/${logo}.svg`;

            // Formata o nome do repositório
            const nomeFormatado = repositorio.name.replace(/[-_]/g, ' ').replace(/[^a-zA-Z0-9\s]/g, '').toUpperCase();

            // Função para truncar texto da descrição
            const truncar = (texto, limite) => texto.length > limite
                ? texto.substring(0, limite) + '...' // Corrigido 'subString' para 'substring'
                : texto;

            // Define a descrição do repositório 
            const descricao = repositorio.description
                ? truncar(repositorio.description, 100) // Corrigido 'respositorio' para 'repositorio'
                : 'Projeto desenvolvido no GitHub';

            // Tags
            const tags = repositorio.topics?.length > 0
                ? repositorio.topics.slice(0, 3).map(topic => `<span class="tag">${topic}</span>`).join('') // Corrigido 'respositorio' para 'repositorio'
                : `<span class="tag">${linguagem}</span>`;

            // Cria o botão deploy
            const botaoDeploy = repositorio.homepage
                ? `<a href="${repositorio.homepage}" target="_blank" class="botao-outline botao-sm">Deploy</a>` // Corrigido '<a/>' para '</a>'
                : '';

            // Botões de ação
            const botoesAcao = `
            <div class="project-buttons">
                <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm">GitHub</a>
                ${botaoDeploy}
            </div>
            `;

            swiperWrapper.innerHTML += `
            <div class="swiper-slide">
                <article class="project-card">
                    <div class="project-image">
                        <img src="${urlLogo}" alt="Ícone ${linguagem}" onerror="this.onerror=null; this.src='./assets/icons/languages/github.svg';">
                    </div>
                    <div class="project-content">
                        <h3>${nomeFormatado}</h3>
                        <p>${descricao}</p>
                        <div class="project-tags">${tags}</div> 
                        ${botoesAcao}
                    </div>  
                </article>
            </div>
            `;
        });

        // Iniciar o carrossel
        iniciarSwiper();

    } catch (error) {
        console.error('Erro ao buscar repositórios:', error);
    }
}

// Executar a função correta ao carregar o script
getProjectsGithub(); 

//função de inicialização do carrossel - swiper
function iniciarSwiper() {
    new Swiper('.projects-swiper', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 24,
        centeredSlides: false,
        loop: true,
        watchOverflow: true,

        breakpoint: {
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 40,
                canteredSlides: false
            },
            769: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 40,
                centeredSlides: false
            },
            1025: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 54,
                centeredSlides: false
            }

        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        autoplay: {
            delay: 5000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
        },

        grabCursor: true,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
    });
}

//função de validadeção do formulário
formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    document.querySelectorAll('form span')
        .forEach(span => span.innerHTML = '');
    
    let isValid = true;

    const nome = document.querySelector('#nome');
    const erroNome = document.querySelector('#error-nome');

    if(nome.value.trim().length < 3) {
        erroNome.innerHTML = 'O Nome deve ter no mínimo 3 caracteres.';
        if (isValid) nome.focus();
        isValid = false;
    }

    const email = document.querySelector('#email');
    const erroEmail = document.querySelector('#erro-email');

    if(!email.value.trim().match(emailRegex)) {
        erroEmail.innerHTML = 'Digite um e-mail válido.';
        if (isValid) email.focus();
        isValid = false;
    }

    const assunto = document.querySelector('#assunto');
    const erroAssunto = document.querySelector('#erro-assunto');

    if (assunto.value.trim().length < 5) {
        erroAssunto.innerHTML = 'O Assunto deve ter no mínimo 5 caracteres.';
        if (isValid) assunto.focus();
        isValid = false;
    }

    const mensagem = document.querySelector('#mensagem');
    const erroMensagem = document.querySelector('#erro-mensagem');

    if (mensagem.value.trim().length === 0) {
        erroMensagem.innerHTML = 'A mensagem não pode ser vazia.';
        if (isValid) mensagem.focus();
        isValid = false;
    }

    if (isValid) {
        const submitButton = formulario.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        formulario.submit();
    }
});

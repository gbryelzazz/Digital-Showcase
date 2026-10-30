


function escrevendoLetra(){
    function ativaLetra(elemento){
        const arrTexto = elemento.innerHTML.split('');
        elemento.innerHTML = '';
        arrTexto.forEach((letra, i)=>{
            setTimeout(() => {
                elemento.innerHTML += letra;
            }, 75 * i);
        });
    }

    const titulo = document.querySelector ('.digitando');
    ativaLetra(titulo);
}

escrevendoLetra();



function menuMobol(){
    const menuToggle = document.querySelector('.menu-toggle');
    const menuIcon = menuToggle?.querySelector('i');
    const navMenu = document.querySelector('header .navegacao-primaria');

    if (!menuToggle || !menuIcon || !navMenu) {
        return;
    }

    menuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('ativado');
        menuIcon.classList.toggle('fa-caret-up', isOpen);
        menuIcon.classList.toggle('fa-caret-down', !isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    });

    navMenu.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('ativado');
            menuIcon.classList.remove('fa-caret-up');
            menuIcon.classList.add('fa-caret-down');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menu');
        });
    });

}

menuMobol();

function sobreMim(){

    const divExperiencia = document.querySelectorAll('.exeperience_content > div');
    const botoesExperiencia = document.querySelectorAll('.exeperience_content ul button');
    const divEducation = document.querySelectorAll('.education_content > div');
    const botoesEducation = document.querySelectorAll('.education_content ul button');

    divExperiencia[0].classList.add('ativo')
    divEducation[0].classList.add('ativo')
    botoesExperiencia[0].closest('li').classList.add('ativo')
    botoesEducation[0].closest('li').classList.add('ativo')

    function slideShow(index){
        if (!divExperiencia[index] || !botoesExperiencia[index]) {
            return;
        }

        divExperiencia.forEach((div)=>{
            div.classList.remove('ativo')
        });
        botoesExperiencia.forEach((botao, botaoIndex)=>{
            botao.closest('li').classList.toggle('ativo', botaoIndex === index)
            botao.setAttribute('aria-pressed', String(botaoIndex === index))
        })
        divExperiencia[index].classList.add('ativo')
    }

    function slideShow2(index){
        if (!divEducation[index] || !botoesEducation[index]) {
            return;
        }

        divEducation.forEach((div)=>{
            div.classList.remove('ativo')
        });
        botoesEducation.forEach((botao, botaoIndex)=>{
            botao.closest('li').classList.toggle('ativo', botaoIndex === index)
            botao.setAttribute('aria-pressed', String(botaoIndex === index))
        })
        divEducation[index].classList.add('ativo')
    }


    botoesExperiencia.forEach((botao,index)=>{
        botao.addEventListener('click', ()=>{
            slideShow(index)
        });
    });

    botoesEducation.forEach((botao,index)=>{
        botao.addEventListener('click', ()=>{
            slideShow2(index)
        });
    });

}

sobreMim();


const projectItems = document.querySelectorAll('.projects_armazenamento [data-category]');
const projectFilters = document.querySelectorAll('.projects_models [data-filter]');

function filterProjects(category) {
    projectItems.forEach((item) => {
        item.classList.toggle('ativo', category === 'all' || item.dataset.category === category);
    });

    projectFilters.forEach((button) => {
        const isSelected = button.dataset.filter === category;
        button.classList.toggle('ativo', isSelected);
        button.setAttribute('aria-pressed', String(isSelected));
    });
}

filterProjects('all');

projectFilters.forEach((button) => {
    button.addEventListener('click', () => {
        const category = button.dataset.filter;
        if (category) {
            filterProjects(category);
        }
    });
});

const projectViewer = document.querySelector('.project_viewer');

if (projectViewer instanceof HTMLDialogElement) {
    const viewerImage = projectViewer.querySelector('.project_viewer_image');
    const viewerTitle = projectViewer.querySelector('#project-viewer-title');
    const viewerCategory = projectViewer.querySelector('.project_viewer_category');
    const downloadLink = projectViewer.querySelector('.project_download');
    const closeButton = projectViewer.querySelector('.project_viewer_close');

    document.querySelectorAll('.project_card').forEach((card) => {
        card.addEventListener('click', () => {
            const image = card.querySelector('img');
            const title = card.dataset.title;
            const category = card.dataset.categoryLabel;

            if (
                !(image instanceof HTMLImageElement) ||
                !(viewerImage instanceof HTMLImageElement) ||
                !(viewerTitle instanceof HTMLElement) ||
                !(viewerCategory instanceof HTMLElement) ||
                !(downloadLink instanceof HTMLAnchorElement) ||
                !title ||
                !category
            ) {
                return;
            }

            viewerImage.src = image.src;
            viewerImage.alt = image.alt;
            viewerTitle.textContent = title;
            viewerCategory.textContent = category;
            downloadLink.href = image.src;
            downloadLink.download = card.dataset.downloadName || 'projeto-portfolio.jpeg';
            projectViewer.showModal();
        });
    });

    closeButton?.addEventListener('click', () => projectViewer.close());

    projectViewer.addEventListener('click', (event) => {
        if (event.target === projectViewer) {
            projectViewer.close();
        }
    });
}

const contactSection = document.querySelector('.contact');

if (contactSection) {
    if ('IntersectionObserver' in window) {
        const contactObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        contactObserver.observe(contactSection);
    } else {
        contactSection.classList.add('is-visible');
    }
}

const contactForm = document.querySelector('#contact-form');

const contactMessage = document.querySelector('#contact-message');

document.querySelectorAll('.pricing_plan_cta').forEach((link) => {
    link.addEventListener('click', () => {
        if (!(contactMessage instanceof HTMLTextAreaElement)) {
            return;
        }

        const selectedPlan = link.dataset.plan;
        if (!selectedPlan) {
            return;
        }

        const additionalMessage = contactMessage.value
            .replace(/^Tenho interesse no plano: .*?(?:\r?\n\r?\n)?/, '')
            .trim();
        contactMessage.value = `Tenho interesse no plano: ${selectedPlan}${additionalMessage ? `\n\n${additionalMessage}` : ''}`;
    });
});

contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const submitter = event.submitter;
    if (!(submitter instanceof HTMLButtonElement)) {
        return;
    }

    const formData = new FormData(contactForm);
    const name = String(formData.get('name')).trim();
    const email = String(formData.get('email')).trim();
    const message = String(formData.get('message')).trim();
    const messageBody = `Olá, Gabriel! Meu nome é ${name}.\n\n${message}\n\nMeu e-mail: ${email}`;

    if (submitter.dataset.channel === 'email') {
        const emailParams = new URLSearchParams({
            view: 'cm',
            fs: '1',
            to: 'gabrielmoura.designer2006@gmail.com',
            su: `Contato pelo portfólio — ${name}`,
            body: messageBody
        });
        const emailUrl = `https://mail.google.com/mail/?${emailParams.toString()}`;
        window.open(emailUrl, '_blank', 'noopener,noreferrer');
        return;
    }

    if (submitter.dataset.channel === 'whatsapp') {
        const whatsappUrl = `https://wa.me/5598985603975?text=${encodeURIComponent(messageBody)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
});

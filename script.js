const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.querySelector(".close");
const modalH3 = document.getElementById('modalH3');
const modalText = document.getElementById('modalText');
const cityFrom = document.getElementById('cityFrom');
const cityTo = document.getElementById('cityTo');
const date = document.getElementById('date');
const now = new Date();
const sectionData = {
    home: {
        icon: './assets/fav-icons/fav-icon_main.jpg',
        title: 'Главная | Карась авиалинии',
        navigationColor: '#000000',
    },
    tickets: {
        icon: './assets/fav-icons/fav-icon_main.jpg',
        title: 'О нас - Наш сайт',
        navigationColor: '#000000',
    },
    services: {
        icon: './assets/fav-icons/fav-icon_main.jpg',
        title: 'Услуги - Наш сайт',
        navigationColor: '#000000',
    },
    contact: {
        icon: './assets/fav-icons/fav-icon_cargo.png',
        title: 'Карго | Карась авиалинии',
        navigationColor: '#000000',
    },
    welcomeSection: {
        icon: './assets/fav-icons/fav-icon_cargo.png',
        title: 'Welcome!',
        navigationColor: '#000000'
    },
};


// Функция для отображения секции
function showSection(id) {
    // Скрываем все секции
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    // Показываем выбранную секцию
    document.getElementById(id).style.display = 'block';

    // Меняем favicon
    const favicon = document.getElementById('favicon');
    favicon.href = sectionData[id].icon;

    // Меняем title
    document.title = sectionData[id].title;

    // Меняем цвет nav
    const nav = document.getElementById('nav');
    nav.style = `background-color: ${sectionData[id].navigationColor};`;
}

// Изначально показываем первую секцию
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
});

// * Смена языка в приветственной секции
document.addEventListener("DOMContentLoaded", () => {
    // Тексты на разных языках
    const welcomeTexts = {
        main: ["Welcome!", "Добро пожаловать!", "¡Bienvenidos!", "Willkommen!"],
        secondary: [
            "Karas airlines greetings you",
            "Карась авиалинии приветствуют вас",
            "Las aerolíneas Karas te saludan",
            "Karas Fluglinien begrüßen Sie"
        ]
    };

    // Получаем ссылки на элементы
    const welcomeTextMain = document.getElementById("welcomeTextMain");
    const welcomeTextSecond = document.getElementById("welcomeTextSecond");

    // Если элементы не найдены, выводим ошибку
    if (!welcomeTextMain || !welcomeTextSecond) {
        console.error("Элементы с идентификаторами 'welcomeTextMain' или 'welcomeTextSecond' не найдены!");
        return;
    }

    // Индекс текущего языка
    let currentIndex = 0;

    // Функция смены текста с анимацией
    function changeWelcomeText() {
        // Сброс анимации
        welcomeTextMain.style.animation = "none";
        welcomeTextSecond.style.animation = "none";

        // Перезапуск анимации через небольшой тайм-аут
        setTimeout(() => {
            welcomeTextMain.style.animation = "moveWelcomeText 1s ease-in-out";
            welcomeTextSecond.style.animation = "moveWelcomeText 1s ease-in-out";

            // Обновляем текст
            welcomeTextMain.textContent = welcomeTexts.main[currentIndex];
            welcomeTextSecond.textContent = welcomeTexts.secondary[currentIndex];

            // Увеличиваем индекс
            currentIndex = (currentIndex + 1) % welcomeTexts.main.length;
        }, 50); // Небольшая задержка, чтобы сброс стилей применился
    }

    // Сразу запускаем первый цикл
    changeWelcomeText();

    // Меняем текст каждые 5 секунд
    setInterval(changeWelcomeText, 5000);
});

function scrollPage() {
    const target = document.getElementById('tickets'); // Элемент, к которому нужно прокрутить
    const targetPosition = target.offsetTop; // Получаем позицию элемента на странице
    const startPosition = window.pageYOffset; // Текущая позиция прокрутки
    const distance = targetPosition - startPosition; // Расстояние до цели
    const duration = 1000; // Время анимации (в миллисекундах)
    let startTime = null;

    function animateScroll(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = timeElapsed / duration; // Прогресс анимации (от 0 до 1)

        // Применяем функцию easing (ease-in-out)
        const easeProgress = progress < 0.5 ? 4 * progress * progress * progress : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;

        // Прокручиваем на нужное расстояние с учетом прогресса
        window.scrollTo(0, startPosition + distance * easeProgress);

        // Если анимация не закончена, продолжаем анимировать
        if (timeElapsed < duration) {
            requestAnimationFrame(animateScroll);
        } else {
            window.scrollTo(0, targetPosition); // Убедитесь, что вы точно находитесь в целевой позиции
        }
    }

    // Запускаем анимацию
    requestAnimationFrame(animateScroll);
}



// Масштабирование и перетаскивание схемы

const image = document.getElementById('regularRoutesScheme');
let scale = 1;
let isAltPressed = false;
let isDragging = false;
let startX, startY;
let offsetX = 0, offsetY = 0;

document.addEventListener('keydown', function(event) {
    if (event.key === 'Alt') {
        isAltPressed = true;
    }
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'Alt') {
        isAltPressed = false;
    }
});

document.addEventListener('wheel', function(event) {
    if (isAltPressed) {
        if (event.deltaY < 0) {
            scale += 0.1;
        } else {
            scale -= 0.1;
        }

        // Ограничиваем масштаб от 0.5 до 3
        scale = Math.max(0.5, Math.min(scale, 3));

        // Применяем трансформацию для изменения масштаба
        image.style.transform = `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;

        event.preventDefault();
    }
}, { passive: false });

image.addEventListener('mousedown', function(event) {
    if (event.button === 0) { // Проверяем, что нажата левая кнопка мыши
        isDragging = true;
        startX = event.clientX - offsetX;
        startY = event.clientY - offsetY;
        event.preventDefault(); // Отключаем стандартное поведение перетаскивания
    }
});

document.addEventListener('mousemove', function(event) {
    if (isDragging) {
        offsetX = event.clientX - startX;
        offsetY = event.clientY - startY;
        image.style.transform = `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;
    }
});

document.addEventListener('mouseup', function() {
    isDragging = false;
});














openModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
});

closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
if (event.target === modal) {
    modal.style.display = "none";
}
});

function ticketFinder () {
    const [choosedYear, choosedMonth, choosedDay] = date.value.split('-').map(Number);
    const choosedDate = new Date(choosedYear, choosedMonth - 1, choosedDay);
    const currentDate = new Date();
    if (cityFrom.value && cityTo.value && date.value && date.value.split('-')[1] <= 12 && date.value.split('-')[1] >= 1 && (choosedDate - currentDate) / 86400000 <= 300 && (choosedDate - currentDate) / 86400000 >= 0) { //86 400 000 = 1000 * 60 * 60 * 24
        modalH3.innerHTML = `Найден билет из ${cityFrom.value.slice(0, 1).toUpperCase() + cityFrom.value.slice(1).toLowerCase()} в ${cityTo.value.slice(0, 1).toUpperCase() + cityTo.value.slice(1).toLowerCase()} ${date.value.split('-')[2]} ${date.value.split('-')[1] == 1 ? ' января ' : date.value.split('-')[1] == 2 ? ' февраля ' : date.value.split('-')[1] == 3 ? ' марта ' : date.value.split('-')[1] == 4 ? ' апреля ' : date.value.split('-')[1] == 5 ? ' мая ' : date.value.split('-')[1] == 6 ? ' июня ' : date.value.split('-')[1] == 7 ? ' июля ' : date.value.split('-')[1] == 8 ? ' августа ' : date.value.split('-')[1] == 9 ? ' сентября ' : date.value.split('-')[1] == 10 ? ' октября ' : date.value.split('-')[1] == 11 ? ' ноября ' : ' декабря '} ${date.value.split('-')[0]} года`;
        modalText.innerHTML =
        `
            <button>Купить билет</button>
        `;
    } else {
        modalH3.innerHTML = 'Хм... кажется мы ничего не нашли';
        modalText.innerHTML =
        `
            Возможные причины ошибки: <br>
            1. Город, указанный вами, не имеет аэропорта или посадочной полосы, подходящей для наших самолётов. <br>
            2. В указанную дату нет авиаперелётов. Билеты продаются на 300 дней вперёд, если вы указали прошедшую дату и/или большую текущей на 300 дней, Карась авиалинии не сможет найти Вам билет. <br>
            3. 
        `;
    }
}

// добавление элемента стартовое окно
function startWinCreate() {

	// создаем блок для <div id="start-block">
	var startWin = document.createElement('div');
	startWin.id = 'start-block';

	// добавляем блок "startWin" на поле игры
	game.appendChild(startWin);
	
}

// добавление элемента лампочка от лого
function logoCreate() {

	// создаем блок-контейнер для появления лампочки для <div id="lamp-blok-container">
	var lampBlockContainer = document.createElement('div');
	lampBlockContainer.id = 'lamp-block-container';

	var startBlock = document.querySelector('#start-block');
	// добавляем блок lamp-block на поле игры в блок стартового окна
	startBlock.appendChild(lampBlockContainer);

	// создаем блок лампочки <div id="lamp-blok">
	var lampBlock = document.createElement('div');
	lampBlock.id = 'lamp-block';
	lampBlockContainer.appendChild(lampBlock);

	// создаем блок-контейнер для появления текста для <div id="text-blok-container">
	var textBlockContainer = document.createElement('div');
	textBlockContainer.id = 'text-block-container';
	startBlock.appendChild(textBlockContainer);

	// создаем блок текста для лого <div id="text-blok">
	var textBlock = document.createElement('div');
	textBlock.id = 'text-block';
	textBlockContainer.appendChild(textBlock);
}

// анимация элемента лампочка от лого
function logoLampAnimationStart() {

	// лого лампочка выезжает снизу из-за контейнера
	logoLampTimeInterval = setInterval( () => {

		var logoLampContainer = document.querySelector('#lamp-block-container');
		var logoLamp = document.querySelector('#lamp-block');

		// выезжает на свою высоту
		if (logoLamp.offsetTop > logoLampContainer.offsetHeight - logoLamp.offsetHeight) {
			logoLamp.style.top = logoLamp.offsetTop - 1 + "px"; // поднимаем вверх на 1 px	
		} else {
			// когда лампочка полностью выехала останавливаем анимацию
			clearInterval(logoLampTimeInterval);
			// запускаем анимацию текстовой части логотипа
			logoTextAnimationStart();
		}
	}, logoLampMotionDelay); // задержка для изменения координат появления лампочки
}

// анимация текстовой части логотипа
function logoTextAnimationStart() {

	// текстовая часть выезжает из-за контейнера 
	logoTextTimeInterval = setInterval( () => {

		var logoText = document.querySelector('#text-block');
		var textBlockContainer = document.querySelector('#text-block-container');

		// выезжает на свою высоту
		if (logoText.offsetTop > textBlockContainer.offsetHeight - logoText.offsetHeight) {
			logoText.style.top = logoText.offsetTop - 1 + "px"; // поднимаем вверх на 1 px	
		} else {
			// когда текстовый блок полностью выехал останавливаем анимацию
			clearInterval(logoTextTimeInterval);
			// создаем текстовый блок что можно нажать пробел для продолжения
			spaceCreate();
			// функция ожидания нажатия пробела
			spaceControl('toStart');
		}
	}, logoTextMotionDelay); // задержка для изменения координат появления лампочки
}

// показывание текста нажмите пробел для продолжения
function spaceCreate() {
	// создаем блок для <h2>Press Space to continue...</h2>
	var spaceBlock = document.createElement('h2');
		spaceBlock.innerText = 'Press Space to continue...';

	var startWin = document.querySelector('#start-block');
	startWin.appendChild(spaceBlock);
}

// функция создает ожидание нажатия на кнопку "пробел"
function spaceControl(dist) {
	// dist - переменная куда переходим на инфо или на старт
	// toInfo или toStart
	document.addEventListener("keydown", waitingSpace); // назначение функции нажатия пробела
	//при истечении времени запускать игру(удалением стартового блока)
	spaceInterval = setTimeout( () => {
		clearTimeout(spaceInterval);
		startBlockRemove();

		// proigrushMusic.pause();
		
		//код для будущего добавления окна информации о проблемах экологии
		if (dist == 'toInfo') {
			infoBlockCreate(); // переход на окно информации
		}
		if (dist == 'toStart') {
			startBlockCreate(); // переход на окно информации
		}
	}, spaceWaitingTime); // ждем 15 секунд

	// функция обработки нажатия на клавишу
	function waitingSpace(event) {
	if (!gameOn) {
		switch(event.keyCode) {
			case 32: 

				// proigrushMusic.pause();

				clickAudio.play();
				//очищать таймер ожидания нажатия на пробел
				clearTimeout(spaceInterval);
				//удалять стартовый блок
				startBlockRemove();
				// когда в будущем будет окно информации будет переход на нее после пробела
				if (dist == 'toInfo') {
					infoBlockCreate(); // переход на окно информации
				}
				if (dist == 'toStart') {
					startBlockCreate(); // переход на окно информации
				}
			break;
		} 
	}
  }
}

// функция создания блока старт с логотипом
function logoBlockCreate() {
	startWinCreate(); // содание стартового окна
	logoCreate(); // создание лампочки
}

// функция удаления стартового блока
function startBlockRemove() {
	var startBlock = document.querySelector('#start-block');
	if (startBlock) {
		startBlock.remove();
		proigrushMusic.pause();
	}
}

// добавление элементов экрана описания игры и кнопки старт
function startElementsCreate() {

	// создаем блок-контейнер для кнопки
	// создаем кнопку старт: <button id="start-button">Start Game</button>
	var startButton = document.createElement('button');
	startButton.id = 'start-button';
	startButton.innerText = 'Start to Mouse';

	// добавляем кнопку в стартовый блок
	var startBlock = document.querySelector('#start-block');

	// добавляем кнопку startButton на поле игры в блок стартового окна
	startBlock.appendChild(startButton);

	//создаю кнопку для включения управления клавиатурой
	//<button id="start-button">Start to Keyboard</button>
	var buttonToKlava = document.createElement('button');
	buttonToKlava.id = "button-klava";
	buttonToKlava.innerText = 'Start to Keyboard';
	startBlock.appendChild(buttonToKlava);


	// здесь можно добавить описание игры
	rulesCreate(startBlock);


	// название игры
	var nameGameBlock = document.createElement('div');
	nameGameBlock.id = 'game-name-block';
	startBlock.appendChild(nameGameBlock);

	// startButton.onclick = startGame;	// назначение действия на кномку Start Game
	startButton.addEventListener('click', startGame);

	buttonToKlava.addEventListener('click', startGameToKlava);
}

// функция создания окна информации
function infoBlockCreate() {
	startWinCreate(); // содание стартового окна
	spaceCreate();
	// функция ожидания нажатия пробела
	spaceControl('toStart');
}


// функция создания окна описания и кнопки старт 
function startBlockCreate() {
	startWinCreate(); // содание стартового окна
	// создание элементов описания игры и кнопки старт
	startElementsCreate();
}

// непосредственный запуск игры
function startGame() {

	//играет музыка фона
	fonMusic.play();

	proigrushMusic.pause();

	// удаляем стартовый блок с кнопкой старта
	gameOn = true; // устанавливаем флаг что игра начата
	startBlockRemove();
	// здесь надо вставить код создания мусора, сетки, жизней и воздуха
	startTrash(); // функция старт мусор

	cleateElements() //создание игровых элементов


	// создаем рыбку
	fishBlockCreate();
	// запускаем анимацию рыбки
	fishBlockAnimationStart();
}


function startGameToKlava() {
	//играет музыка фона
	fonMusic.play();
	proigrushMusic.pause();

	gameOn = true; // устанавливаем флаг что игра начата

	// удаляем стартовый блок с кнопкой старта
	startBlockRemove();

	cleateElements(); //создание игровых элементов
	startTrash(); // функция старт мусор
	//создаем рыбу
	fishBlockCreateKlava();
	//запускаем анимацию рыбы
	fishKlavaAnimationStart();
}

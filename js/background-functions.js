
// добавление элемента "небо"
function skyCreate() {

	// создаем блок для <div id="sky-block">
	var skyBlock = document.createElement('div');
	skyBlock.id = 'sky-block';

	// добавляем блок "небо" на поле игры
	game.appendChild(skyBlock);
	
}

// добавление элемента "море"
function seaCreate() {

	// создаем блок для <div id="sea-block">
	var seaBlock = document.createElement('div');
	seaBlock.id = 'sea-block';

	// добавляем блок "море" на поле игры
	game.appendChild(seaBlock);
	
}


// добавление элемента "задний фон море" #1
function seaBottom1Create() {

	// создаем блок для <div id="sea-block">
	var seaBottom = document.createElement('div');
	seaBottom.id = 'sea-bottom1';

	// добавляем блок "море" на поле игры
	game.appendChild(seaBottom);
	
}

// добавление элемента "задний фон море" #2 (это элемент, который появляется слева)
function seaBottom2Create() {

	// создаем блок для <div id="sea-block">
	var seaBottom = document.createElement('div');
	seaBottom.id = 'sea-bottom2';

	// добавляем блок "море" на поле игры
	game.appendChild(seaBottom);
	
}


// добавление элемента "задний фон кит"
function blockKitCreate() {

	// создаем блок для <div id="kit-block">
	var element = document.createElement('div');
	element.id = 'kit-block';

	// добавляем блок "море" на поле игры
	game.appendChild(element);
	
}


// добавление элемента "задний фон остров"
function blockIslandCreate() {

	// создаем блок для <div id="island-block">
	var element = document.createElement('div');
	element.id = 'island-block';

	// добавляем блок "море" на поле игры
	game.appendChild(element);
	
}

// добавление элемента "задний фон облако 1"
function skyCloudCreate() {

	// создаем блок для <div id="cloud1-block">
	var element1 = document.createElement('div');
	element1.id = 'cloud2-block';

	// добавляем блок облако 2 - то которое справа и сзади на поле игры
	game.appendChild(element1);

	// создаем блок для <div id="cloud1-block"> то облако что слева и спереди
	var element2  = document.createElement('div');
	element2.id = 'cloud1-block';
	game.appendChild(element2);

}


// функция создания фона главная 
function backgroundCreate() {

	skyCreate(); // содание блока "небо"
	skyCloudCreate();
	blockIslandCreate(); // создание острова
	seaCreate(); // создание блока "море"
	blockKitCreate();
	seaBottom1Create(); // создаем нижний блок водорослей - видимый
	seaBottom2Create(); // создаем нижний блок водорослей - невидимый

}

// старт анимации нижней части моря
function seaBottomAnimationStart() {
	seaBottomTimeInterval = setInterval( () => {
		var seaBottom1 = document.querySelector('#sea-bottom1');
		var seaBottom2 = document.querySelector('#sea-bottom2');
		var x1 = seaBottom1.offsetLeft; // текущее положение первого блока водорослей
		var x2 = seaBottom2.offsetLeft; // текущее положение первого блока водорослей

		seaBottom1.style.left = x1 - seaBottomMotionSize + 'px';
		seaBottom2.style.left = x2 - seaBottomMotionSize + 'px';
		// проверка выхода за экран и изменение координат
		if (x1 < -gameWidth) { // первый блок вышел за экран, второй стал в нулевую координату
			seaBottom1.style.left = x2 + gameWidth - seaBottomMotionSize + 'px'; // ставим его справа игрового поля
		}
		if (x2 < -gameWidth) { // второй блок вышел за экран, первый стал в нулевую координату
			seaBottom2.style.left = x1 + gameWidth - seaBottomMotionSize + 'px'; // ставим его справа игрового поля
		}
	}, seaBottomMotionDelay); // задержка для изменения координат
}


// старт анимации острова
function islandAnimationStart() {
	islandTimeInterval = setInterval( () => {
		var island = document.querySelector('#island-block');
		var x = island.offsetLeft; // текущее положение 
		var islandWidth = island.offsetWidth; // размер острова

		island.style.left = x - islandMotionSize + 'px';
		// проверка выхода за экран и изменение координат
		if (x < -islandWidth) { // блок вышел за экран
			island.style.left = gameWidth + 'px'; // ставим его справа игрового поля
		}
	}, islandMotionDelay); // задержка для изменения координат
}

// старт анимации облако 1
function cloud1AnimationStart() {
	cloudTimeInterval = setInterval( () => {
		var cloud = document.querySelector('#cloud1-block');
		var x = cloud.offsetLeft; // текущее положение 
		var cloudWidth = cloud.offsetWidth; // размер острова

		cloud.style.left = x - cloudMotionSize + 'px';
		// проверка выхода за экран и изменение координат
		if (x < -cloudWidth) { // блок вышел за экран
			cloud.style.left = gameWidth + 'px'; // ставим его справа игрового поля
		}
	}, cloudMotionDelay); // задержка для изменения координат
}

// старт анимации облако 2
function cloud2AnimationStart() {
	cloudTimeInterval = setInterval( () => {
		var cloud = document.querySelector('#cloud2-block');
		var x = cloud.offsetLeft; // текущее положение 
		var cloudWidth = cloud.offsetWidth; // размер острова

		cloud.style.left = x - cloudMotionSize + 'px';
		// проверка выхода за экран и изменение координат
		if (x < -cloudWidth) { // блок вышел за экран
			cloud.style.left = gameWidth + 'px'; // ставим его справа игрового поля
		}
	}, cloudMotionDelay*2); // задержка для изменения координат в два раза
}

// старт анимации кита
function kitAnimationStart() {
	kitTimeInterval = setInterval( () => {
		var kit = document.querySelector('#kit-block');
		var x = kit.offsetLeft; // текущее положение 
		var kitWidth = kit.offsetWidth; // размер острова

		kit.style.left = x - kitMotionSize + 'px';
		// проверка выхода за экран и изменение координат
		if (x < -kitWidth) { // блок вышел за экран
			kit.style.left = gameWidth + 'px'; // ставим его справа игрового поля
		}
	}, kitMotionDelay); // задержка для изменения координат
}

function kitAnimationStop() {
	clearInterval(kitTimeInterval);
}

function  startBackgroundAnimation() {
	seaBottomAnimationStart();
	islandAnimationStart();
	cloud1AnimationStart();
	cloud2AnimationStart();
	kitAnimationStart();
}

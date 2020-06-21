// добавление элемента рыбка
function fishContainerCreate() {

	// создаем блок для <div id="fish-container-block">
	var fishContainerBlock = document.createElement('div');
	fishContainerBlock.id = 'fish-container-block';

	// добавляем блок "fish-container-block" на поле игры он должен быть самым верхним чтобы рыба правильно ходила
	game.appendChild(fishContainerBlock); 
	
}

// удаление элемента рыбка
function fishContainerDelete() {

	// удаляем блок для <div id="fish-container-block">
	var fishContainerBlock = document.querySelector('#fish-container-block');

	if (fishTimeInterval) {
		clearInterval(fishTimeInterval);
	}

	if (fishContainerBlock) {
		fishContainerBlock.remove();
	}

	fish = null;
	
}

// добавление элемента рыбка
function fishCreate() {

	// создаем блок для <div id="fish-block">
	var fishBlock = document.createElement('div');
	var fishContainerBlock = document.querySelector('#fish-container-block');
	fishBlock.id = 'fish-block';
	fish = fishBlock;
	fishBlock.className = 'fishright';

	// добавляем блок "startWin" на поле игры
	fishContainerBlock.appendChild(fishBlock);
	
}

function testCollision(obj1, obj2) {

	var xColl=false;
	var yColl=false;
	if (!obj1) {
		return; // сравнивать не с чем
	}

	if (!obj2) {
		return; // сравнивать не с чем
	}

	var obj1x = obj1.offsetLeft - (obj1.offsetWidth-30)/2; // координата Х центра рыбы // корректируем на левую верхнюю точку более тесное сопрокосновение
	var obj1width = obj1.offsetWidth - 30;

	var obj2x = obj2.offsetLeft;
	var obj2width = obj2.offsetWidth;

	var obj1y = obj1.offsetTop - (obj1.offsetHeight-20)/2; // координата Y центра рыбы // корректируем на левую верхнюю точку более тесное сопрокосновение
	var obj1height = obj1.offsetHeight - 20;

	var obj2y = obj2.offsetTop;
	var obj2height = obj2.offsetHeight;


	if ((obj1x + obj1width >= obj2x) && (obj1x <= obj2x + obj2width)) {
		xColl = true;
	}
	if ((obj1y + obj1height >= obj2y) && (obj1y <= obj2y + obj2height)) {
		yColl = true;
	}

	if ( xColl && yColl ) { 
		return true;
	}
	return false;
}


// старт движения рыбки
function fishAnimationStart() {

	fishTimeInterval = setInterval( () => {

		calculateNewCoordinates(fish);


		// проверка на достижение рыбой верхней границы
		if (fish.offsetTop + fishStep*deltaY > 250) {
			fish.style.top = fish.offsetTop + fishStep*deltaY + "px";
		}

		fish.style.left = fish.offsetLeft + fishStep*deltaX + "px";

		/**********************************
			События при касании объектов
		**********************************/	
		// поймали солнце
		if (testCollision(fish, sun)) {
			if ( oneTrashDelete() ) {
				deleteSun();
				createSun();	
			} else {
				gameOver(true, 'победа');
			}
		}
		//поймали пузырек
		if (testCollision(fish, bubble)) {
			addO2();
			deleteBubble();
			createBubble();
		}
		//коснулись сети
		if (testCollision(fish, seine)) {
			touchSeine();
		}
		//поймали нефть
		if (testCollision(fish, blot)) {
			takeO2();
			deleteBlot();
			createBlot();
		}

		// проверяем столкновение с мусором
		if (testCollision(fish, trashObjects[currentFloatTrash])) {
			// поставить мусор в начало

			trashMoveStep[currentFloatTrash] = 1;
			trashObjects[currentFloatTrash].style.top = 180 + 'px';
			currentFloatTrash = null;
			// удаляем жизнь
			deleteLive();
		}
	}, fishMotionDelay); 
	
}

function calculateNewCoordinates(fish) {
	// инициализация глобальных переменных для смещения рыбы
	deltaX = 0;
	deltaY = 0;
	var b;

	// вычисление векторов расстояния до курсора мыши
	var vectorX = realMouseX - fish.offsetLeft;
	var vectorY = realMouseY - fish.offsetTop;
	
	// если курсор мыши на рыбе, то ничего не делать
	if (vectorX == 0 && vectorY == 0) {
		return;
	}

	b = Math.abs(vectorX) >= Math.abs(vectorY) ? Math.abs(vectorX) : Math.abs(vectorY);
	deltaX = vectorX/b;
	deltaY = vectorY/b;

	if (deltaX < 0) {
		// рыбка плывет влево
			fish.className = 'fishleft';
	} else {
		// рыбка плывет вправо
			fish.className = 'fishright';
	}

}


// функция создания блока рыбки главная
function fishBlockCreate() {
	fishContainerCreate();
	fishCreate(); // содание стартового окна
	game.addEventListener("mousemove", fishToMouse); // назначение функции обработки мыши
}


function fishBlockAnimationStart() {
	fishAnimationStart();
}

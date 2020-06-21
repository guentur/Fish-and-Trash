
// функция создания фоновой картинки для обьекта trash
function createTrashRandomBackImages(trash) {
	// генерируем случайное число в интервале от 1 до 6 для случайного выбора картинки
	var randomNumber = randomIntFromInterval(1, countImages);
	// выбираем случайную картинку по номеру случайного сгенерированного числа
	var image = "images/trash" + randomNumber + ".png";
	// для обьекта trash устанавливаем картинку в свойство стиля backgroundImage
	trash.style.backgroundImage = "url("+ image +")";
}

// функция генерации случайного числа в интервале
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// фукнция создания блок <div id="trash-block"></div>, для определения границы заплыва мусора
function createTrashBlock(){
	// создаем элемент div
	var trashBlock = document.createElement('div');
	// устанавливаем id = "trash-block"
	trashBlock.id = 'trash-block';
	// добавляем блок <div id="trash-block"></div> к игровому полю
	game.appendChild(trashBlock);
}


// фукнция удаления блок <div id="trash-block"></div>, для определения границы заплыва мусора
function deleteTrashBlock() {
	// создаем элемент div
	var trashBlock = document.querySelector('#trash-block');
	if (trashBlock) {
		trashBlock.remove();
	}

	clearInterval(floatingTrashInterval); 
	trashMoveStep = [];
	trashObjects = [];
}

// функция создания обьекта trash <div class="trash"></div>
//с входящими параметрами размещения
function createTrash(positionTop, positionLeft) {
	// создаем блок для <div class="trash"></div>
	var trash = document.createElement('div');
	// устанавливаем имя класса trash
	trash.className = 'trash';
	// размещаем обьект trash на позиции top
	trash.style.top = positionTop + 'px';
	// размещаем обьект trash на позиции left
	trash.style.left = positionLeft + 'px';
	// создаем рандомно фоновую картинку для обьекта trash 
	createTrashRandomBackImages(trash);
	// добавляем обьект trash на поле игры
	var trashBlock = document.querySelector('#trash-block');	
	trashBlock.appendChild(trash);
}

// функция добавления обьекта trash для старта отображения его на игровом поле
function addTrashStart() {
	// выбираем класс обьектов trash
	var trash = document.querySelector('.trash');
	// текущее количество обьектов trash
	var currentTrash = 0;
	startTrashPositionLeft = 10;
	startTrashPositionTop = 170;
	// если текущее количество обьектов trash меньше требуемого количества, тогда создаем
	while (currentTrash < countTrash) {
		// создаем обьект trash
		createTrash(startTrashPositionTop, startTrashPositionLeft);
		// высота размещения обьекта + каждый последующий элемент будет размещен выше/ниже
		startTrashPositionTop = startTrashPositionTop + randomIntFromInterval(startTrashPositionTopMin, startTrashPositionTopMax);
		// ширина размещения обьекта + каждый последующий элемент будет размещен правее/левее друг от друга
		startTrashPositionLeft = startTrashPositionLeft + randomIntFromInterval(startTrashPositionLeftMin, startTrashPositionLeftMax);
		// увеличиваем счетчик количества текущих обьектов trash
		currentTrash = currentTrash + 1;
	}
}

// старт анимации плавающих обьектов trash
function floatTrashStart() {
	// выбираем все обьекты с классом trash
	trashObjects = document.getElementsByClassName('trash');

	for(i = 0; i < trashObjects.length; i++) {
		trashMoveStep[i] = randomIntFromInterval(0, 1);
		if (trashMoveStep[i] == 0) {
			trashMoveStep[i] = -1;
		}
	}


	console.dir(trashObjects);
	// выполняем движения обьектов trash рандомно в промежутке с -2 до 2 px
	floatingTrashInterval = setInterval( () => {
			
			if (currentFloatTrash == null || currentFloatTrash >= trashObjects.length ) {
				// если нет плавающего єлемента, выбираем случайно элемент для падения
				currentFloatTrash = randomIntFromInterval(0, trashObjects.length - 1);
				trashMoveStep[currentFloatTrash] = 1;
			} 
			
			var trashStep = trashMoveStep[currentFloatTrash];

			if (trashStep > 0 && trashObjects[currentFloatTrash].offsetTop + trashStep*trashSpeed >= 700) {
				trashMoveStep[currentFloatTrash] = -1;
				trashObjects[currentFloatTrash].style.top = trashObjects[currentFloatTrash].offsetTop + trashStep*trashSpeed + 'px';					
			} else {
				if (trashStep < 0 && trashObjects[currentFloatTrash].offsetTop + trashStep*trashSpeed <= 170) {
					trashMoveStep[currentFloatTrash] = 1;
					currentFloatTrash = null;
				} else {
					trashObjects[currentFloatTrash].style.top = trashObjects[currentFloatTrash].offsetTop + trashStep*trashSpeed + 'px';
				}
			}

			for(i = 0; i < trashObjects.length; i++) {
				trashAnimationStart(i);
			}
					
 	}, intervalTrashPositionChange);
}


function trashAnimationStart(i) {

	if (i != currentFloatTrash ) {
		if (trashMoveStep[i] > 0 && trashObjects[i].offsetTop + trashMoveStep[i] >= 200) {
			trashMoveStep[i] = -1;			
		} else {
			if (trashMoveStep[i] < 0 && trashObjects[i].offsetTop + trashMoveStep[i] <= 160) {
				trashMoveStep[i] = 1;
			}
		}
		trashObjects[i].style.top = trashObjects[i].offsetTop + trashMoveStep[i] + 'px';
	}

}


// генерируем случайный массив чисел от 1 до 20
function getRandomArrayCountNumber(number) {
	var arr = [];
	for (var i = 0; i < number; i++) {
  		arr.push(Math.floor(Math.random() * 20) + 1)
	}
	return arr;
}

//функция запуска блоков и обьектов trash
function startTrash() {
	createTrashBlock();
	addTrashStart();
	floatTrashStart();

}

// удаление одного мусора с экрана
function oneTrashDelete() {

	var trashForDelete = randomIntFromInterval(0, trashObjects.length-1);
	var trashFloatStep; // если есть мусор что плавает его прирощение сохраняем
	var i;

	trashObjects[trashForDelete].remove();

	// создается новый массив
	trashObjects = [];
	trashMoveStep = [];
	trashObjects = document.getElementsByClassName('trash');

	if (trashObjects.length > 0) {
		for(i = 0; i < trashObjects.length; i++) {
			trashMoveStep[i] = randomIntFromInterval(0, 1);
			if (trashMoveStep[i] == 0) {
				trashMoveStep[i] = -1;
			}
		// высота размещения обьекта + каждый последующий элемент будет размещен выше/ниже
			trashObjects[i].style.top = startTrashPositionTop + randomIntFromInterval(startTrashPositionTopMin, startTrashPositionTopMax) + 'px';	
		}
		return true; // еще мусор есть играем дальше
	} else {
		return false; // конец игры
	}
}
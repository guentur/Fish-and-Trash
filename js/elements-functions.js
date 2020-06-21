//Генератор случайных чисел от 0 до мах
function random(max) {
	//Сгенерировать случайное число от 0 до заданого при вызове
	rand = Math.random() * (max + 1);
	//Округлить это число
	rand = Math.floor(rand);
	//Вернуть число
	return rand;
}

//Генератор случайных чисел от min до мах
function getRandomInt(min, max) {
	//сгенерировать случайное число из заданого промежутка, округлить его и вернуть в функцию
 	return Math.floor(Math.random() * (max - min)) + min;
}

//Создание блока "сеть"
function createSeine(){
	//создание блока div
	seine = document.createElement("div");
	//подключить стили
	seine.id = "seine";
/////////////////////////////////////////////////////////////////////////////////////////исправлено
	seine.style.top = 697 + "px";
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//поднимать сеть на 1рх в секунду
	risingSeine = setInterval(function(){
		//уменьшить отступ сверху на 1рх
		seine.style.top = seine.offsetTop - movePX + "px";

		//когда сетка подымется до уровня моря
		if (seine.offsetTop == air) {
			//остановить алгоритм подъема и очистить переменную
			clearInterval(risingSeine);
		}
	}, risingSeineSpeed); //промежуток между подъемами

	//сделать сеть дочерним блоком игрового поля
	game.appendChild(seine);
}

//удалить сетку
function deleteSeine() {
	clearInterval(risingSeine);
	seine.remove();
}

//если рыба коснулась сети
function touchSeine() {
 //опустить сеть немного вниз
	seine.style.top = seine.offsetTop + seineRebound + "px";
	if (seine.offsetTop > gameHeight) {
		seine.style.top = gameHeight + "px";
 	}
	 //забрать жизнь
 	deleteLive();
}


//Создание пузырькa
function createBubble(){
	//создание блока div
	bubble = document.createElement("div");
	//подключить стили
	bubble.id = "bubbles";

	//Изначально будет появлятся в случайной точке под игровым полем 
	bubble.style.left = random(mainWidth) + "px"; // горизонтальное положение определяется случайно
	bubble.style.top = mainHeight + "px"; //находится ниже поля игры

	//функция для колебаний пузырька
	movingBubble = setInterval( function() {
		//если пузырь движется к левой границе
		if (border == "left") {
			//увеличить отступ слева на 1 пиксель
			bubble.style.left = bubble.offsetLeft + movePX + "px";
			//если счетчик не достиг указаного предела
			if (borderCounter < borderCounterLimit) {
				borderCounter ++; //увеличить счетчик на 1
			}else{
				borderCounter = 0; //обнулить счетчик
				border = "right"; //изменить направление движения
			}
		}else{ //если движется к правой границе
			//уменьшить отступ слева на 1 пиксель
			bubble.style.left = bubble.offsetLeft - movePX + "px";
			//если счетчик не достиг указаного предела
			if (borderCounter < borderCounterLimit) {
				//увеличить счетчик на 1
				borderCounter ++;
			}else{
				borderCounter = 0; //обнулить счетчик
				border = "left"; //изменить направление движения
			}
		}
	}, movingBubbleSpeed) //промежуток между колебаниями
		

	//Подъем пузырька вверх
	risingBubble = setInterval( function() {
		//уменьшить отступ сверху на 1рх
		bubble.style.top = bubble.offsetTop - movePX + "px";

		//Если достиг поверхности удалить и создать новый
		if (bubble.offsetTop == air) {
			//удалить пузырек
			bubble.remove();
			//очистить переменные (чтобы не ускорялись с каждым новым пузырьком)
			clearInterval(risingBubble); //очистить интервал подъема
			clearInterval(movingBubble); //очистить интервал колебаний
			//вызвать функцию создания нового шарика
			createBubble();
		}
	}, risingBubbleSpeed) //промежуток между подъемами

	//сделать пузырек дочерним блоком игрового поля
	game.appendChild(bubble);
}

//удалить пузырьки без появления
function deleteBubble() {
	clearInterval(risingBubble); //очистить интервал подъема
	clearInterval(movingBubble); //очистить интервал колебаний
	bubble.remove();
}

function createSun() {
	//создание блока div
	sun = document.createElement("div");
	//подключить стили
	sun.id = "sun";

	if (random(1) == 1) {
		//появляется в справа от игрового поля
		sun.style.left = mainWidth + "px";
		//в случайной точке выше сетки и ниже воздуха
		sun.style.top = getRandomInt(air, seine.offsetTop - sunSize) + "px";

		//функция движения солнца влево
		risingSun = setInterval(function(){
			//уменьшить отступ слева на 1 пиксель
			sun.style.left = sun.offsetLeft - movePX + "px";

			//если вышло за пределы игрового поля
			if (sun.offsetLeft <= -sunSize) {
				//удалить солнце
				sun.remove();
				//удалить интервал
				clearInterval(risingSun);
				//создать новое солнце
				createSun();
			}
		}, risingSunSpeed) //промежуток между передвижением
	} else {
		//появляется в справа от игрового поля
		sun.style.left = "0px";
		//в случайной точке выше сетки и ниже воздуха
		sun.style.top = getRandomInt(air, seine.offsetTop - sunSize) + "px";

		risingSun = setInterval(function(){
			//уменьшить отступ справа на 1 пиксель
			sun.style.left = sun.offsetLeft + movePX + "px";

			//если вышло за пределы игрового поля
			if (sun.offsetLeft >= gameWidth ) {
				//удалить солнце
				sun.remove();
				//удалить интервал
				clearInterval(risingSun);
				//создать новое солнце
				createSun();
			}
		}, risingSunSpeed) //промежуток между передвижением
	}

	//сделать солнце дочерним блоком игрового поля
	game.appendChild(sun);
}

//уделить солнца
function deleteSun() {
	//удалить интервал
	clearInterval(risingSun);
	sun.remove();
}


//создание общего блока жизней
function createLivesBlock() {
	livesBlock = document.createElement("div");
	livesBlock.id = "livesBlock";

	//текущее кол-во жизней
	var haveLives = 0;

	//цикл для добавления необходимого кол-вo жизней
	while(haveLives < needLives){
		//добавить жизнь
		createLives();
		//увеличить инф-ию о текущем кол-ве жизней
		haveLives++;
	}
	game.appendChild(livesBlock);
}

function createNewLivesBlock() {
	needLives = 3;
	createLivesBlock();
}

//удалить весь блок жизней
function deleteLivesBlock() {
	livesBlock.remove();	
}

//создание одной жизни
function createLives() {
	live = document.createElement("span");
	live.id = "live";

	//добавить жизнь в блок жизней
	livesBlock.appendChild(live);
}

//функция удаления одной жизни
function deleteLive() {
	//удалить блок жизней
	livesBlock.remove();
	//уменьшить количество создаваемых жизней в блоке жизней на 1
	needLives--;
	if (needLives == 0) {
		gameOver(false, 'кончились жизни');
	}else{
		//создать новый блок жизней (уже с меньшим количеством жизней)
		createLivesBlock();
	}
}

//создание блока воздуха
function createOxygen() {
	//создание иконки с баллоном
	o2_icon = document.createElement("div");
	o2_icon.id = "oxygen-icon";
	oxygenTimer = 200;

	//создание заднего плана
	o2_background = document.createElement("div");
	o2_background.id = "oxygen-background";

	//создание индикатора
	o2 = document.createElement("div");
	o2.id = "oxygen-balance";
	
	//функция для потери воздуха
	balance = setInterval(function(){
		//изначально цвет индикатора зеленый (>75% начальной длины)
		if (o2.offsetWidth < incOxygenWidth) {
			o2.className = "green";

			//50-75% желтый
			if (o2.offsetWidth < 0.75 * incOxygenWidth) {
				o2.className = "yellow";

				//25-50% оранжевый
				if (o2.offsetWidth < 0.5 * incOxygenWidth) {
					o2.className = "orange";

					//<25% красный
					if (o2.offsetWidth < 0.25 * incOxygenWidth) {
						o2.className = "red";
					}
				}
			}
		}

		//если больше нужной длины
		if (o2.offsetWidth > 0.2 * incOxygenWidth) {	
			//уменьшить индикатор на один пиксель
			o2.style.width = oxygenTimer + "px";	
		}

		//-1 секунда
		oxygenTimer--;
		//если время вышло
		if (oxygenTimer <= 0) {
			//запустить функцию конца игры
			gameOver(false,'кончился кислород');
		}
	}, losingOxygenSpeed);

	
	//сделать блоки воздуха дочерними для поля игры
	game.appendChild(o2_icon);
	game.appendChild(o2_background);
	game.appendChild(o2);
}

//удаление блока воздуха
function deleteOxygen() {
	o2.remove();
	o2_background.remove();
	o2_icon.remove();
}

//создать кляксу
function createBlot() {
	blot = document.createElement("div");
	blot.id = "blot";

	spawnBlot = setInterval(function(){
		//появиться в случайной точке выше сетки и ниже воздуха
		blot.style.left = random(mainWidth) + "px";
		blot.style.top = getRandomInt(air, seine.offsetTop - sunSize) + "px";
	},spawnBlotSpeed)
	

	game.appendChild(blot);
}

function deleteBlot() {
	clearInterval(spawnBlot);
	blot.remove();
}

function cleateElements() {
	createSeine(); //создание сетки
	createBubble(); //создание пузырьков
	createSun(); //создание солнц
	createNewLivesBlock(); //создание блока жизней
	createOxygen() //создание индикатора воздуха
	createBlot(); //создать кляксу
}

function deleteElements() {
	//очистить интервал
	clearInterval(balance);
	deleteSeine(); //удалить сетку
	deleteBubble(); //удалить пузырьки
	deleteSun(); //удалить солнца
	deleteLivesBlock(); //удалить блок жизней
	deleteOxygen(); //удалить блок с воздухом
	deleteBlot(); //удалить кляксу	
}

function addO2() {
	o2.style.transition = "all 0s";
	o2.className = "green";
	oxygenTimer = oxygenTimerInc;
	o2.style.width = oxygenTimer + "px";
}

function takeO2() {
	o2.style.transition = "all 0.5s";
	if (o2.offsetWidth > 0.2 * incOxygenWidth){
		oxygenTimer = oxygenTimer / 2;
		o2.style.width = oxygenTimer + "px";
	}
} 
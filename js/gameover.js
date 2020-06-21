// добавление элементов экрана описания игры и кнопки старт
function gameOverWinCreate(win) {
	startWinCreate(); // содание стартового окна
	// создание элементов описания игры и кнопки старт
	gameOverElementsCreate(win); // это функция для Кирилла - создать информацию 

	// создаем текстовый блок что можно нажать пробел для продолжения
	spaceCreate();
	// функция ожидания нажатия пробела
	spaceControl('toStart');
}


// функция создания окна проигрыша игры
function gameOver(win, text) {
	KlavaAnimationStop();
	deleteFishKlava();

	gameOn = false;
	//удалить фоновую музыку
	deleteFonMusic();

	proigrushMusic.play();

	deleteTrashBlock(); // удаление мусора

	fishContainerDelete(); // удаление рыбы
	/* ИВАН */
	deleteElements(); //удаление игровых элементов
	// создание окна "конец игры"
	//удалить рыбу
	
	console.log(text);
	gameOverWinCreate(win);
}

function gameOverElementsCreate(win) {

	// добавляем кнопку в стартовый блок
	var startBlock = document.querySelector('#start-block');

	// текст проиграл
	if (!win) {
		rulesLuse(startBlock);
	} else {
		youWinBlock(startBlock);
	}

	// название игры
	var nameGameBlock = document.createElement('div');
	nameGameBlock.id = 'game-name-block';
	startBlock.appendChild(nameGameBlock);

}


function rulesLuse(startBlock) {
	//создаю блок где будет содержаться текст с описанием проигрыша
	var pravilaIgru = document.createElement('div');
	pravilaIgru.id = 'pravilaIgru';
	//добавляю блок в окно старта
	startBlock.appendChild(pravilaIgru);

	//создаю заголовок проиграл
	var zagolovokProigral = document.createElement('h3');
	zagolovokProigral.id = 'zagolovokProigral';
	zagolovokProigral.innerText = "Ты не справился!";
	//добавляю заголовок в блок правил игры
	pravilaIgru.appendChild(zagolovokProigral);

	//создаю текст проигрыша
	var tekstProigral = document.createElement('p');
	tekstProigral.id = "tekstProigral";
	tekstProigral.innerText = '   Группа ученых, в которую вошли исследователи со всего мира, заявила: загрязнение воздуха, водоемов и почв ведет к преждевременной смерти миллионов людей ежегодно. Финансовый ущерб от этих экологических проблем оценили в триллионы долларов. По словам ученых, загрязнение природы угрожает дальнейшему выживанию человечества в целом.'
	pravilaIgru.appendChild(tekstProigral);
}

//создаю блок где будет содержаться инфо "ты победил"
function youWinBlock(startBlock) {
	
	var winBlock = document.createElement('div');
	winBlock.id = 'win-block';
	//добавляю блок в окно старта
	startBlock.appendChild(winBlock);

}

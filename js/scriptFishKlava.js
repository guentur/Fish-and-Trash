function keyOn(event) {

	// console.log(event.keyCode);

	switch(event.keyCode) {
//Вправо (D)
		case 68: 
			moveX = 2;
		break;
//Влево (A)
		case 65:	
			moveX = -2;
		break;
// В низ (S)
		case 83:
			moveY = 2;
		break;
//В верх (W)
		case 87:		
			moveY = -2;
		break;
	}

}

function keyOff(event) {

	// console.log("ОТЖАТО");
	switch(event.keyCode) {
//Вправо (D)
		case 68: 
			moveX = 0;
		break;
//Влево (A)
		case 65:	
			moveX = 0;
		break;
// В низ (S)
		case 83:
			moveY = 0;
		break;
//В верх (W)
		case 87:		
			moveY = 0;
		break;
	}

}

function moveFishKlava() {

		fishTimeInterval = setInterval(function() {

////////////проверка достижения рыбой верхней границ
			
			if(fish == null){return;}

				//сделать проверку границ (if)
				if (fish.offsetTop + moveY <= 725 &&
					fish.offsetTop + moveY >= 250) {

					fish.style.top = fish.offsetTop + moveY + "px";
				}

				if(fish.offsetLeft + moveX <= 965 &&
					fish.offsetLeft + moveX >= 0) {

					fish.style.left = fish.offsetLeft + moveX + "px";
				}
					

					if (moveX < 0) {
						// рыбка плывет влево
						fish.className = 'fishleft';

					} else if (moveX >= 0) {
						// рыбка плывет вправо
						fish.className = 'fishright';
					}
			/**********************************
				События при касании объектов
			**********************************/	
////////////// поймали солнце
			if (testCollision(fish, sun)) {
				if ( oneTrashDelete() ) {
					deleteSun();
					createSun();

				} else {
					gameOver(true, 'победа');
				}
			}

//////////////поймали пузырек
			if (testCollision(fish, bubble)) {
				addO2();
				deleteBubble();
				createBubble();
			}

//////////////коснулись сети
			if (testCollision(fish, seine)) {
				touchSeine();
			}

//////////////поймали нефть
			if (testCollision(fish, blot)) {
				takeO2();
				deleteBlot();
				createBlot();
			}

////////////// проверяем столкновение с мусором
			if (testCollision(fish, trashObjects[currentFloatTrash])) {
				// поставить мусор в начало
				trashMoveStep[currentFloatTrash] = 1;
				trashObjects[currentFloatTrash].style.top = 180 + 'px';
				currentFloatTrash = null;
				// удаляем жизнь
				deleteLive();
			}

		},10)

}

function fishBlockCreateKlava() {
	fishTimeInterval = 0;

	fishContainerCreate();
	fishCreate();
	// var fishInterval = 0
	document.addEventListener('keydown', keyOn);
	document.addEventListener('keyup', keyOff);

	//Координаты направления движения в начале = 0 
	moveX = 0;
	moveY = 0;
}

function KlavaAnimationStop() {
	clearInterval(fishTimeInterval);
}

function deleteFishKlava() {
	fishContainerDelete();
}

function fishKlavaAnimationStart() {
	moveFishKlava();
}
// переменная количества картинок для обьекта trash
const countImages = 6;
// переменная общего количества обьектов trash
const countTrash = 20; 
// переменная стартовой позиции top резмещения обьекта 
var startTrashPositionTop = 190;
// переменная стартовой позиции left резмещения обьекта
var startTrashPositionLeft = 10;


// переменная позиции top начиная с данного значения 
const startTrashPositionTopMin = -7;
// переменная позиции top заканчивая данным значением
const startTrashPositionTopMax = 8;
// переменная позиции top начиная с данного значения 
const startTrashPositionLeftMin = 45;
// переменная позиции top заканчивая данным значением
const startTrashPositionLeftMax = 55;

// переменная интервала смены позиции обьекта trash
const intervalTrashPositionChange = 20;

var floatingTrashInterval;

var currentFloatTrash = null;

var trashMoveStep = new Array();

var trashObjects = new Array();

const trashSpeed = 5;

// ---------------------------- это надо проверить нужны ли
// переменная значение перемещения обьекта начиная с числа
var moveTrashPositionFrom = -2;
// переменная значение перемещения обьекта по число
var moveTrashPositionTo = 2;
// переменная для огравничение выхода обьекта trash по правому краю поля игры
var limitTrashPositionRight = 962;
// переменная для огравничение выхода обьекта trash по левому краю поля игры
var limitTrashPositionLeft = 0;
// переменная для огравничение выхода обьекта trash по верхнему краю поля игры
var limitTrashPositionTop = 209;
// переменная для огравничение выхода обьекта trash по нижнему краю поля игры
var limitTrashPositionDown = 181;

// переменна верней границы позиции элемента который будет двигаться
var floatTrashDownPosition = 550;
// переменна нижней границы позиции элемента который будет двигаться
var floatTrashUpPosition = 200;
// переменная кооличества рандомных цилес обьекта мусора, который будет плавать
var randomArrayCountNumber = 2;
// интервал движения обьекта 
var intervalNumberMoveTrash = 20;
//таймаут движения обьекта
var timeOutNumberMoveTrash = 300;
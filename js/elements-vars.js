//	КОНСТАНТЫ  \\
const oxygenTimerInc = 200; //максимальное значение таймера

const air = 200; //размер участка игрового поля над морем
const mainWidth = 1024; //ширина игрового поля
const mainHeight = 768; //высота игрового поля
const sunSize = 80; //диаметр солнца
const incOxygenWidth = 200; //начальная ширина блока воздуха

const movePX = 1; //стандартное перемещение за интервал для всех элементов (без рывков)

const borderCounterLimit = 30; //амплитуда колебаний пузырька

const risingSeineSpeed = 600; //задержка в 1с между подъемами сети
const risingBubbleSpeed = 10;	//скорость подъема позырька
const movingBubbleSpeed = 30; //интервал для колебаний пузырька
const risingSunSpeed = 10; //скорость движения солнца
const losingOxygenSpeed = 100; //скорость потери воздуха
const spawnBlotSpeed = 3000; //интервал между спавном кляксы

const seineRebound = 100; //отскок сети при попадании рыбы в нее


//	ПЕРЕМЕННЫЕ	\\
var game = document.querySelector("#game"); //игровое поле

var seine = null; //сеть
var bubble = null; //пузырьки
var sun = null; //солнце
var o2 = null; //индикатор воздуха
var o2_background = null; //задний фон и граница воздуха
var o2_icon = null; //значок с балоном
var blot = null; //пятно нефти

var livesBlock = null; //блок жизней
var live = null; //отдельная жизнь
var haveLives = 0; //текущее кол-во жизней
var needLives = 3; //необходимое кол-во жизней

var oxygenTimer = oxygenTimerInc; //таймер воздуха


//Для движения пузырька влево-вправо
var border = null; //граница от которой движется пузырь
var borderCounter = 0; //счетчик перемещения при движении в сторону


var risingSeine; //интервал для сетки
var risingBubble; //интервал для подъема бульбашек
var movingBubble; //интервал для колебаний бульбашек
var risingSun; //интервал для солнц
var balance; //интервал для воздуха
var spawnBlot; //интервал для клякс


var game = new Phaser.Game(960, 540, Phaser.AUTO, '', {preload: preload, create: create, update: update, render: render});

var level00_bg;
var level01_bg;
var level02_bg;
var finalScene;
var hero;
var enemy0;
var enemy1;
var enemy2;
var enemy3;

var camFade;

var invisibleBtn0;
var invisibleBtn1;
var invisibleBtn2;
var invisibleBtn3;
var invisibleBtn4;
var invisibleBtn5;
var invisibleBtn6;

var pathPoint0_PosX;
var pathPoint0_PosY;

var pathPoint1_PosX;
var pathPoint1_PosY;

var pathPoint2_PosX;
var pathPoint2_PosY;

var pathPoint3_PosX;
var pathPoint3_PosY;

var pathPoint4_PosX;
var pathPoint4_PosY;

var pathPoint5_PosX;
var pathPoint5_PosY;

var pathPoint6_PosX;
var pathPoint6_PosY;

var hero2KillEnemy;
var enemy2KillHero;

var enemy0isKilled;
var enemy1isKilled;
var enemy2isKilled;
var enemy3isKilled;

var isResetLevel;

var tween;

var stepCounter;

var levelCounter;

var moveAudio;
var captureAudio;
var coinAudio;
var backgroundAudio;

function preload(){
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    game.load.image('level00_bg', 'assets/level00_bg.jpg');
    game.load.image('level01_bg', 'assets/level01_bg.jpg');
    game.load.image('level02_bg', 'assets/level02_bg.jpg');
    game.load.image('hero', 'assets/Hero.png', 55, 94);
    game.load.image('enemy0', 'assets/Enemy0.png', 60, 18);
    game.load.image('enemy1', 'assets/Enemy1.png', 60, 18);
    game.load.image('enemy2', 'assets/Enemy2.png', 60, 18);
    game.load.image('enemy3', 'assets/Enemy3.png', 60, 18);
    game.load.image('invisibleButton', 'assets/invisibleButton.png', 25, 25);
    game.load.image('camFade', 'assets/camFade.jpg');
    game.load.image('finalScene', 'assets/finalScene.jpg');
    game.load.audio('moveAudio', 'assets/move.mp3');
    game.load.audio('captureAudio', 'assets/swoosh.mp3');
    game.load.audio('coinFallingAudio', 'assets/coinFalling.mp3');
    game.load.audio('backgroundAudio', 'assets/background.mp3');

    pathPoint0_PosX = 703; pathPoint0_PosY = 230;
    pathPoint1_PosX = 480; pathPoint1_PosY = 393;
    pathPoint2_PosX = 280; pathPoint2_PosY = 245;
    pathPoint3_PosX = 427; pathPoint3_PosY = 150;

    stepCounter = 0;
}

function create(){
    levelCounter = 0;

    level00_bg = game.add.sprite(0, 0, 'level00_bg');

    isResetLevel = false;

    hero2KillEnemy = false;
    enemy2KillHero = false;

    enemy0isKilled = false;
    enemy1isKilled = false;
    enemy2isKilled = false;
    enemy3isKilled = false;

    enemy0 = game.add.sprite(pathPoint2_PosX, pathPoint2_PosY, 'enemy0');
    enemy0.anchor.x = 0.5;
    enemy0.anchor.y = 0.8;

    hero = game.add.sprite(703, 230, 'hero');
    hero.anchor.x = 0.5;
    hero.anchor.y = 0.8;

    invisibleBtn0 = game.add.button(pathPoint0_PosX, pathPoint0_PosY, 'invisibleButton', onClick0, this);
    invisibleBtn1 = game.add.button(pathPoint1_PosX, pathPoint1_PosY, 'invisibleButton', onClick1, this);
    invisibleBtn2 = game.add.button(pathPoint2_PosX, pathPoint2_PosY, 'invisibleButton', onClick2, this);
    invisibleBtn3 = game.add.button(pathPoint3_PosX, pathPoint3_PosY, 'invisibleButton', onClick3, this);
    invisibleBtn4 = game.add.button(pathPoint4_PosX, pathPoint4_PosY, 'invisibleButton', onClick4, this);
    invisibleBtn5 = game.add.button(pathPoint5_PosX, pathPoint5_PosY, 'invisibleButton', onClick5, this);
    invisibleBtn6 = game.add.button(pathPoint6_PosX, pathPoint6_PosY, 'invisibleButton', onClick6, this);

    invisibleBtn0.anchor.x = 0.5; invisibleBtn0.anchor.y= 0.5;
    invisibleBtn1.anchor.x = 0.5; invisibleBtn1.anchor.y= 0.5;
    invisibleBtn2.anchor.x = 0.5; invisibleBtn2.anchor.y= 0.5;
    invisibleBtn3.anchor.x = 0.5; invisibleBtn3.anchor.y= 0.5;
    invisibleBtn4.anchor.x = 0.5; invisibleBtn4.anchor.y= 0.5;
    invisibleBtn5.anchor.x = 0.5; invisibleBtn5.anchor.y= 0.5;
    invisibleBtn6.anchor.x = 0.5; invisibleBtn6.anchor.y= 0.5;

    moveAudio = game.add.audio('moveAudio');
    captureAudio = game.add.audio('captureAudio');
    coinAudio = game.add.audio('coinFallingAudio');
    backgroundAudio = game.add.audio('backgroundAudio');
    backgroundAudio.loopFull();
}

function update(){

}

function onClick0() {
    if(levelCounter == 0){
        if(stepCounter ==  1){
            tween = game.add.tween(hero).to({x: pathPoint0_PosX, y: pathPoint0_PosY}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
            tween.onComplete.add(onComplete0, this);
        }
    }else if(levelCounter == 1){
        if(stepCounter ==  1){
            tween = game.add.tween(hero).to({x: pathPoint0_PosX, y: pathPoint0_PosY}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
            tween.onComplete.add(onComplete0, this);
        }
    }else if(levelCounter == 2){
        hero2KillEnemy = false;
        if(stepCounter ==  1 || stepCounter ==  3){
            tween = game.add.tween(hero).to({x: pathPoint0_PosX, y: pathPoint0_PosY}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
            tween.onComplete.add(onComplete0, this);
        }
    }
}

function onClick1() {
    if(levelCounter == 0){
        if(stepCounter ==  0 || stepCounter ==  2){
            tween = game.add.tween(hero).to({x: pathPoint1_PosX, y: pathPoint1_PosY}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
            moveAudio.play();
            tween.onComplete.add(onComplete1, this);
        }
    }else if(levelCounter == 1){
        hero2KillEnmey = false;
        if(stepCounter ==  0 || stepCounter ==  2 || stepCounter ==  4){
            tween = game.add.tween(hero).to({x: pathPoint1_PosX, y: pathPoint1_PosY}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
            moveAudio.play();
            tween.onComplete.add(onComplete1, this);
        }
    }else if(levelCounter == 2){
        hero2KillEnemy = true;
        if(stepCounter ==  0 || stepCounter ==  2){
            tween = game.add.tween(hero).to({x: pathPoint1_PosX, y: pathPoint1_PosY}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
            moveAudio.play();
            tween.onComplete.add(onComplete1, this);
        }
    }
}

function onClick2() {
    if(levelCounter == 0){
        if(stepCounter ==  3 || stepCounter ==  1){
            tween = game.add.tween(hero).to({x: pathPoint2_PosX, y: pathPoint2_PosY}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
            moveAudio.play();
            tween.onComplete.add(onComplete2, this);
        }
    }else if(levelCounter == 1){
        hero2KillEnemy = true;
        if(stepCounter ==  3 || stepCounter ==  1){
            tween = game.add.tween(hero).to({x: pathPoint2_PosX, y: pathPoint2_PosY}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
            moveAudio.play();
            tween.onComplete.add(onComplete2, this);
        }
    }else if(levelCounter == 2){
        if(stepCounter ==  1 || stepCounter ==  3 || stepCounter ==  5){
            tween = game.add.tween(hero).to({x: pathPoint2_PosX, y: pathPoint2_PosY}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
            moveAudio.play();
            tween.onComplete.add(onComplete2, this);
        }
    }
}

function onClick3() {
    if(levelCounter == 0){
        if(stepCounter ==  2) {
            tween = game.add.tween(hero).to({x: pathPoint3_PosX, y: pathPoint3_PosY}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
            moveAudio.play();
            tween.onComplete.add(onComplete3, this);
            removeButton();
        }
    }else if(levelCounter == 1){
        if(stepCounter ==  4 || stepCounter == 2) {
            tween = game.add.tween(hero).to({x: pathPoint3_PosX, y: pathPoint3_PosY}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
            moveAudio.play();
            tween.onComplete.add(onComplete3, this);
        }
    }else if(levelCounter == 2){
        hero2KillEnemy = true;
        if(stepCounter ==  0 || stepCounter ==  2 || stepCounter ==  4){
            tween = game.add.tween(hero).to({x: pathPoint3_PosX, y: pathPoint3_PosY}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
            moveAudio.play();
            tween.onComplete.add(onComplete3, this);
        }
    }
}

function onClick4() {
    if(levelCounter == 1){
        hero2KillEnemy = false;
        if(stepCounter ==  1 || stepCounter == 3 ||stepCounter == 5) {
            tween = game.add.tween(hero).to({x: pathPoint4_PosX, y: pathPoint4_PosY}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
            moveAudio.play();
            tween.onComplete.add(onComplete4, this);
        }
    }else if(levelCounter == 2){
        hero2KillEnmey = false;
        if(stepCounter ==  3 || stepCounter ==  5){
            tween = game.add.tween(hero).to({x: pathPoint4_PosX, y: pathPoint4_PosY}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
            moveAudio.play();
            tween.onComplete.add(onComplete4, this);
        }
    }
}

function onClick5() {
    if(levelCounter == 1){
        hero2KillEnemy = false;
        if(stepCounter ==  4) {
            tween = game.add.tween(hero).to({x: pathPoint5_PosX, y: pathPoint5_PosY}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
            moveAudio.play();
            tween.onComplete.add(onComplete5, this);
            removeButton();
        }
    }else if(levelCounter == 2){
        hero2KillEnmey = false;
        if(stepCounter ==  2 || stepCounter ==  4 || stepCounter ==  6){
            tween = game.add.tween(hero).to({x: pathPoint5_PosX, y: pathPoint5_PosY}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
            moveAudio.play();
            tween.onComplete.add(onComplete5, this);
        }
    }
}

function onClick6() {
    if(levelCounter == 2){
        hero2KillEnemy = false;
        if(stepCounter ==  5){
            tween = game.add.tween(hero).to({x: pathPoint6_PosX, y: pathPoint6_PosY}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
            moveAudio.play();
            coinAudio.play();
            tween.onComplete.add(onComplete6, this);
        }
    }
}

function onComplete0(){
    stepCounter = 0;
}

function onComplete1(){
    stepCounter = 1;
}

function onComplete2(){
    stepCounter = 2;
    if(levelCounter == 0){
        tween = game.add.tween(enemy0).to({y: -150}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
        captureAudio.play();
    }else if(levelCounter == 2){
        if(hero2KillEnemy == true){
            tween = game.add.tween(enemy1).to({y: -150}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
            captureAudio.play();
            enemy1isKilled = true;
            hero2KillEnmey = false;
        }
    }

}

function onComplete3() {
    stepCounter = 3;
    if (levelCounter == 0) {
        camFade = game.add.sprite(0, 0, 'camFade');
        camFade.alpha = 0;
        tween = game.add.tween(camFade).to({alpha: 1}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
        tween.onComplete.add(onFadeInComplete, this);
    }else if(levelCounter == 1){
        if(hero2KillEnemy == true){
            tween = game.add.tween(enemy2).to({y: -150}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
            captureAudio.play();
            enemy2isKilled = true;
            hero2KillEnmey = false;
        }
    }else if(levelCounter == 2){
        if(enemy1isKilled == false){
            removeButton();
            tween = game.add.tween(enemy1).to({x: pathPoint3_PosX, y: pathPoint3_PosY}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
            moveAudio.play();
            tween.onComplete.add(heroDead, this);
        }
    }
}

function onComplete4(){
    stepCounter = 4;
    if(levelCounter == 1){
        if(enemy2isKilled == false){
            removeButton();
            tween = game.add.tween(enemy2).to({x: pathPoint4_PosX, y: pathPoint4_PosY}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
            moveAudio.play();
            tween.onComplete.add(heroDead, this);
        }
    }else if(levelCounter == 2){
        if(hero2KillEnemy == true){
            tween = game.add.tween(enemy3).to({y: -150}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
            captureAudio.play();
            enemy3isKilled = true;
            hero2KillEnemy = false;
        }
    }
}

function onComplete5(){
    stepCounter = 5;
    if(levelCounter == 1){
        camFade = game.add.sprite(0, 0, 'camFade');
        camFade.alpha = 0;
        tween = game.add.tween(camFade).to({alpha: 1}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
        tween.onComplete.add(onFadeInComplete, this);
    }else if(levelCounter == 2){
        if(enemy3isKilled == false){
            removeButton();
            tween = game.add.tween(enemy3).to({x: pathPoint5_PosX, y: pathPoint5_PosY}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
            moveAudio.play();
            tween.onComplete.add(heroDead, this);
        }
    }
}

function onComplete6(){
    stepCounter = 6;
    finalScene = game.add.sprite(0, 0, 'finalScene');
    finalScene.alpha = 0;
    tween = game.add.tween(finalScene).to({alpha: 1}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
    tween.onComplete.add(clickToReplay, this);
}

function heroDead() {
    tween = game.add.tween(hero).to({y: -150}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
    captureAudio.play();
    tween.onComplete.add(resetLevel, this);
}

function resetLevel(){
    isResetLevel = true;
    camFade = game.add.sprite(0, 0, 'camFade');
    camFade.alpha = 0;
    tween = game.add.tween(camFade).to({alpha: 1}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
    tween.onComplete.add(onFadeInComplete, this);
}

function removeButton(){
    invisibleBtn0.x = -100; invisibleBtn0.y = -100;
    invisibleBtn1.x = -100; invisibleBtn1.y = -100;
    invisibleBtn2.x = -100; invisibleBtn2.y = -100;
    invisibleBtn3.x = -100; invisibleBtn3.y = -100;
    invisibleBtn4.x = -100; invisibleBtn4.y = -100;
    invisibleBtn5.x = -100; invisibleBtn5.y = -100;
    invisibleBtn6.x = -100; invisibleBtn6.y = -100;
}

function clickToReplay() {
    finalScene.kill();
    finalScene = game.add.button(0, 0, 'finalScene', resetGame, this);
}

function resetGame() {
    game.state.restart();
}

function onFadeInComplete(){
    stepCounter = 0;
    if(levelCounter < 2 && isResetLevel == false){
        levelCounter++;
    }
    console.log(levelCounter);
    if(levelCounter == 1){
        pathPoint0_PosX = 616; pathPoint0_PosY = 332;
        pathPoint1_PosX = 482; pathPoint1_PosY = 242;
        pathPoint2_PosX = 345; pathPoint2_PosY = 338;
        pathPoint3_PosX = 224; pathPoint3_PosY = 245;
        pathPoint4_PosX = 361; pathPoint4_PosY = 157;
        pathPoint5_PosX = 489; pathPoint5_PosY = 73;

        level00_bg.kill();
        level01_bg = game.add.sprite(0, 0, 'level01_bg');

        invisibleBtn0 = game.add.button(pathPoint0_PosX, pathPoint0_PosY, 'invisibleButton', onClick0, this);
        invisibleBtn1 = game.add.button(pathPoint1_PosX, pathPoint1_PosY, 'invisibleButton', onClick1, this);
        invisibleBtn2 = game.add.button(pathPoint2_PosX, pathPoint2_PosY, 'invisibleButton', onClick2, this);
        invisibleBtn3 = game.add.button(pathPoint3_PosX, pathPoint3_PosY, 'invisibleButton', onClick3, this);
        invisibleBtn4 = game.add.button(pathPoint4_PosX, pathPoint4_PosY, 'invisibleButton', onClick4, this);
        invisibleBtn5 = game.add.button(pathPoint5_PosX, pathPoint5_PosY, 'invisibleButton', onClick5, this);

        invisibleBtn0.anchor.x = 0.5; invisibleBtn0.anchor.y= 0.5;
        invisibleBtn1.anchor.x = 0.5; invisibleBtn1.anchor.y= 0.5;
        invisibleBtn2.anchor.x = 0.5; invisibleBtn2.anchor.y= 0.5;
        invisibleBtn3.anchor.x = 0.5; invisibleBtn3.anchor.y= 0.5;
        invisibleBtn4.anchor.x = 0.5; invisibleBtn4.anchor.y= 0.5;
        invisibleBtn5.anchor.x = 0.5; invisibleBtn5.anchor.y= 0.5;

        enemy2 = game.add.sprite(pathPoint3_PosX, pathPoint3_PosY, 'enemy2');
        enemy2.anchor.x = 0.5;
        enemy2.anchor.y = 0.8;
    }else if(levelCounter == 2){
        pathPoint0_PosX = 476; pathPoint0_PosY = 434;
        pathPoint1_PosX = 226; pathPoint1_PosY = 246;
        pathPoint2_PosX = 317; pathPoint2_PosY = 184;
        pathPoint3_PosX = 567; pathPoint3_PosY = 365;
        pathPoint4_PosX = 654; pathPoint4_PosY = 297;
        pathPoint5_PosX = 404; pathPoint5_PosY = 130;
        pathPoint6_PosX = 488; pathPoint6_PosY = 75;

        level01_bg.kill();
        level02_bg = game.add.sprite(0, 0, 'level02_bg');

        invisibleBtn0 = game.add.button(pathPoint0_PosX, pathPoint0_PosY, 'invisibleButton', onClick0, this);
        invisibleBtn1 = game.add.button(pathPoint1_PosX, pathPoint1_PosY, 'invisibleButton', onClick1, this);
        invisibleBtn2 = game.add.button(pathPoint2_PosX, pathPoint2_PosY, 'invisibleButton', onClick2, this);
        invisibleBtn3 = game.add.button(pathPoint3_PosX, pathPoint3_PosY, 'invisibleButton', onClick3, this);
        invisibleBtn4 = game.add.button(pathPoint4_PosX, pathPoint4_PosY, 'invisibleButton', onClick4, this);
        invisibleBtn5 = game.add.button(pathPoint5_PosX, pathPoint5_PosY, 'invisibleButton', onClick5, this);
        invisibleBtn6 = game.add.button(pathPoint6_PosX, pathPoint6_PosY, 'invisibleButton', onClick6, this);

        invisibleBtn0.anchor.x = 0.5; invisibleBtn0.anchor.y= 0.5;
        invisibleBtn1.anchor.x = 0.5; invisibleBtn1.anchor.y= 0.5;
        invisibleBtn2.anchor.x = 0.5; invisibleBtn2.anchor.y= 0.5;
        invisibleBtn3.anchor.x = 0.5; invisibleBtn3.anchor.y= 0.5;
        invisibleBtn4.anchor.x = 0.5; invisibleBtn4.anchor.y= 0.5;
        invisibleBtn5.anchor.x = 0.5; invisibleBtn5.anchor.y= 0.5;
        invisibleBtn6.anchor.x = 0.5; invisibleBtn6.anchor.y= 0.5;

        enemy1 = game.add.sprite(pathPoint2_PosX, pathPoint2_PosY, 'enemy1');
        enemy1.anchor.x = 0.5;
        enemy1.anchor.y = 0.8;

        enemy3 = game.add.sprite(pathPoint4_PosX, pathPoint4_PosY, 'enemy3');
        enemy3.anchor.x = 0.5;
        enemy3.anchor.y = 0.8;

        enemy1isKilled = false;
        enemy3isKilled = false;
    }
    hero.bringToTop();
    hero.x = pathPoint0_PosX; hero.y = pathPoint0_PosY;
    camFade.bringToTop();
    tween = game.add.tween(camFade).to({alpha: 0}, 800, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
    tween.onComplete.add(onFadeOutComplete, this);
    isResetLevel = false;
}

function onFadeOutComplete(){
    camFade.kill();
}


function render(){

}
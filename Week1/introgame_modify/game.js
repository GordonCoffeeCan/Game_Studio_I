//  PHASER MODDING GAME
//  Bennett Foddy, NYU Game Center, 2016
//  Based on Orisinal's 'Winterbells'

//  here's where we initialize the Phaser system, and tell it which functions will handle all the different parts of the game loop
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

//  GLOBAL VARIABLES - these can be accessed and modified by any function since they're declared outside all functions
var DEBUG = false; //if you change this to true, it will show the collision boxes in the scene
var platforms; //the group we'll hold all the platforms in
var dude; //the player sprite
var coins; //the coin sprite
var monsters;
var welcomePage;
var gameOverPage;
var background;
var groundH;
var groundV;
//var hat; //the player's hat sprite
var score; //this will just be an integer (whole number)
var cursors; //a container for accessing the cursor keys on the keyboard
var cameraSpeed;
var keyJump;
var spaceBar;
var upPressed;
var doubleJump;
var dudeIsDead;

var gameStart;
var camMove;
var gameMusic; //the sound when the player jumps
var coinSound;

//  The preload() function is where we set any variables and resources that need to be ready before the game starts
//  It gets called ONCE, and create() is not called until preload is finished loading all the files
//  Typically this function is used for loading images and sounds.
function preload() {

    //  Center the screen HORIZONTALLY and VERTICALLY on the web page
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;


    //  Refresh the game so it will apply the positioning indicated above (ie, scaled larger and centered)
    game.scale.refresh();

    //This forces the camera to always be at whole-pixel coordinates, which looks nicer
    game.renderer.renderSession.roundPixels = true; 

    //  LOAD IMAGES
    //  here we load in the three images and one sound that we'll use for the game.
    //  in each case the first parameter given to the function is the name it will be given in Phaser's internal cache
    //  the second parameter is the file location, 
    //  and the final parameters on the image files are the size of an individual frame of animation.
    game.load.spritesheet('playerSprite', 'assets/playerSprite.png', 36, 64);
    //game.load.spritesheet('hatSprite', 'assets/hat.png', 50, 50);
    game.load.spritesheet('platformSprite', 'assets/platform0.png', 250, 50);
    game.load.image('welcomePage', 'assets/welcomePage.jpg');
    game.load.image('gameOverPage', 'assets/gameOver.png');
    game.load.image('background', 'assets/background.jpg');
    game.load.image('groundH', 'assets/groundH.png');
    game.load.image('groundV', 'assets/groundV.png');
    game.load.spritesheet('coinSprite', 'assets/coinSprite.png', 32, 32);
    game.load.spritesheet('monsterSprite', 'assets/monsterSprite.png', 49, 60);
    game.load.audio('gameMusic', 'assets/gameMusic.mp3');
    game.load.audio('coinSound', 'assets/coins.mp3');

    //  whoa a hexadecimal color! Don't freak out, this is just 3 numbers, one for red, green and blue
    //  the numbers run from 0-F and each channel has 2 digits, so 'FF' is the maximum and '00' is the minimum
    //  thus '0xFFFFFF' is white and '0x000000' is black, while '0x4488AA' would be light blue
    //game.stage.backgroundColor = 0x4488AA; 

}

//  The create() function is called once, before anything else happens in the game.
//  It's mostly used for creating game objects and setting all the numbers to their starting values.
function create() {

    //  set the player's score to zero
    score = 0;

    //  we use this function to enable input from the cursor keys. 
    cursors = game.input.keyboard.createCursorKeys();
    keyJump = game.input.keyboard;
    spaceBar = game.input.keyboard;
    cameraSpeed = 2;
    upPressed = false;
    doubleJump = false;
    gameStart = false;
    camMove = false;
    dudeIsDead = false;
    //  set the rectangle area the camera can move in. The first two coordinates are the top-left corner
    //  of the rectangle, then the second two are the width and height. In this case we want to create a very large vertical 
    //  rectangle with the player starting at the bottom of it
    game.world.setBounds(0, 0, game.width + 20480, game.height); 

    //  we start up the simple Arcade physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //add background;
    welcomePage = game.add.sprite(0, 0, 'welcomePage');
    gameOverPage = game.add.sprite(0, 0, 'gameOverPage');
    background = game.add.tileSprite(0, 0, 1486, 600, 'background');
    groundH = game.add.sprite(game.camera.x + 2, game.height - 52, 'groundH');
    groundV = game.add.sprite(game.camera.x - 2, 0, 'groundV');

    //  add the player, which is a Sprite object. We give it a position, and the name of the image to look up from the cache (which was set in preload)
    dude = game.add.sprite(165, game.height * 0.65, 'playerSprite');
    dude.animations.add('left', [0, 1, 2, 3], 7, true);
    dude.animations.add('right', [5, 6, 7, 8], 7, true);

    //  switch on physics for the player. This adds an object of type 'Body' to the sprite
    game.physics.arcade.enable(dude);
    game.physics.arcade.enable(groundH);
    game.physics.arcade.enable(groundV);
    //  now that the body is added, we can access it
    dude.body.gravity.y = 400; //how fast the player should accelerate with gravity
    
    //  the player's collision box is too big. Let's squish it and shove it down a bit.
    dude.body.height = 61;
    dude.body.offset.y = -3;

    groundH.body.height = 35;
    groundH.body.offset.y = 15;
    groundV.body.width = 35;

    //  create the player's hat - this isn't just cosmetic, we'll use it as a target for the camera,
    //  so we can make sure the camera never scrolls down
    //hat = game.add.sprite(dude.x,dude.y-40,'hatSprite');

    //  tell the game camera to lock on to the hat. The numbers control how fast the camera accelerates to follow the hat.

    //  we'll create an empty group to hold all the platforms.
    //  this will make it easy to do things to all the platforms at once
    platforms = game.add.group();
    coins = game.add.group();
    monsters = game.add.group();

    groundH.body.checkCollision.down = false;
    groundH.body.checkCollision.up = true;
    groundH.body.checkCollision.left = false;
    groundH.body.checkCollision.right = false;

    groundV.body.checkCollision.down = false;
    groundV.body.checkCollision.up = false;
    groundV.body.checkCollision.left = true;
    groundV.body.checkCollision.right = false;

    groundH.body.immovable = true;
    groundV.body.immovable = true;

    groundH.name = "GroundH";
    groundV.name = "GroundV";

    //  This will enable arcade physics for any object that is created in this group, so we can run collisions on the whole group at once.
    platforms.enableBody = true;
    coins.enableBody = true;
    monsters.enableBody = true;

    //  Now we want to make some platforms. To do that, first specify how far apart they should be, in pixels.
    var platformSpacing = 350;

    //  Using that number, we can figure out how many platforms to make. We want to make about two screens' worth, so we always
    //  have enough to fill the screen. So let's figure out how many that is using game.height, the height of the screen in pixels.
    //var numPlatforms = game.height * 2 / platformSpacing; //two screens worth of platforms
    var numPlatforms = 30;
    var coinNumber = 5;

    //  Now we're ready to make the platforms, using a loop where i will go from 0 to numPlatforms
    for (var i = 0; i < numPlatforms; i++){
      
        //  where should we put the platform? We want to randomize the horizontal location, and space them evenly in the vertical
        //  game.rnd.frac() gives a random number between 0 and 1
        //var horizontal_location =  game.rnd.frac()*(game.width*0.8)+game.width*0.1; //each platform at a random horizontal place, between 10% and 90% of the screen width
        var horizontal_location =  500 + i * platformSpacing + (50 + Math.random() * 100); //each platform at a random horizontal place, between 10% and 90% of the screen width
        var vertical_location = 150 + Math.random() * 348; //each platform 100 pixels higher than the last
       
        //  create a new platform, storing it in a temporary local variable 'newPlatform' 
        var newPlatform = platforms.create(horizontal_location,vertical_location,'platformSprite'); //create the sprite

        //  by default, the position of a sprite is its top-left corner, but in this case I want to center the platform
        //  around its x-position, so I move its 'anchor' to the middle of the sprite
        newPlatform.anchor.x = 0.5; 

        //if we don't set the platform's body to 'immovable' the player will push it when she touches it
        newPlatform.body.immovable = true; 

        //  we only want the player to collide with the platform if she is falling down (colliding with the TOP of the platform)
        //  so we disable the other collision directions
        newPlatform.body.checkCollision.down = false;
        newPlatform.body.checkCollision.up = true; //allows objects to collide with the platform from above
        newPlatform.body.checkCollision.left = false;
        newPlatform.body.checkCollision.right = false;

        //  here's a nice thing about Javascript - if you want to invent a new property on an object you just set it
        //  when we set 'alreadyBouncedOn' to false, suddenly it exists as a property! No need to write 'var' in that case.
        newPlatform.alreadyBouncedOn = false;

        for(var j = 0; j < coinNumber; j++){
            var _randomMonsterOrder = Math.floor(1 + Math.random() * coinNumber);
            if(j == _randomMonsterOrder){
                var _monster = monsters.create(horizontal_location - 105 + j * 42, vertical_location - 52, 'monsterSprite');
                _monster.body.immovable = true;
                _monster.animations.add('monsterAnim', [0, 1, 2, 3, 4, 5, 6, 7], 7, true);
                _monster.animations.play('monsterAnim');
                _monster.name = "Monster";
                _monster.body.width = 25;
                _monster.body.offset.x = 12;
                _monster.body.checkCollision.down = false;
            }else{
                var _coin = coins.create(horizontal_location - 96 + j * 42, vertical_location - 32, 'coinSprite');
                _coin.name = "Coin";
                _coin.animations.add('twinkle', [0, 1, 2, 3], 5, true);
                _coin.animations.play('twinkle');
                _coin.body.immovable = true;
                _coin.body.width = 25;
                _coin.body.offset.x = 3.5;
            }
        }

    }

    //  put one platform under the player to make sure there's a starting point
    //  Phaser groups have a nice function 'getFurthestFrom(x)' which gets the member of the group furthest from x
    var ground = platforms.getFurthestFrom(dude); //if we accidentally got the closest one, the first jump might be impossible
    ground.x = 177; //start in the middle of the screen
    ground.y = game.height - 100; //start 25px above the bottom of the screen

    //  finally, let's make sure the player is drawn on top of the platforms, and the hat is drawn above the player
    groundV.bringToTop();
    dude.bringToTop();
    welcomePage.bringToTop();
    //hat.bringToTop();

    //  initialize the variable for the jump sound - we'll use this object to play the sound
    gameMusic = game.add.audio('gameMusic');
    coinSound = game.add.audio('coinSound');
    gameMusic.loopFull();


}


//  The update() function is called once per frame, before render()
//  Normally this is used for moving objects, updating scores, applying rules, and so on - everything that has to happen every frame
function update() {
    if(gameStart == false && dudeIsDead == false){
        spaceBar.onUpCallback = function(e){
            if(e.keyCode == 32){
                welcomePage.kill();
                setStart();
                game.time.events.add(Phaser.Timer.SECOND * 1, setCamMove, this);
            }
        }
    }else if(gameStart == false && dudeIsDead == true){
        spaceBar.onUpCallback = function(e){
            if(e.keyCode == 32){
                gameMusic.destroy();
                game.cache.removeSound('gameMusic');
                game.state.restart();
            }
        }
    }
  
    //  In Phaser's Arcade Physics, collisions don't happen automatically.
    //  We have to tell it to 'collide' any objects or groups that should collide
    //  It checks to see if objects are overlapping, and separates them if they are.

    //  Collide the player with the platforms - and call a function called 'bounce' when that happens
    //game.physics.arcade.collide(dude, platforms, bounce);
    game.physics.arcade.collide(dude, platforms);
    game.physics.arcade.collide(dude, coins, getTouched);
    game.physics.arcade.collide(dude, monsters, getTouched);
    game.physics.arcade.collide(dude, groundH, getTouched);
    game.physics.arcade.collide(dude, groundV, getTouched);
    background.x = game.camera.x;

    //  we want to make the hat follow player in the horizontal direction, so it stays above her head
    //hat.x = dude.x;

    //  ... but in the vertical direction, only make it follow the player when she's going up
    //  (so the camera never scrolls down)
    /*if (dude.y-40 < hat.y){
        hat.y = dude.y - 40;
    }*/
    //  note! I moved the hat before I moved the player, so it will always lag 1 frame behind the player
    //  I think that looks cool

    //  PLAYER CONTROL
    //  Here's where we'll allow the player to move the player character
    //  first of all, let's slow the player down to 90% of her previous speed every frame
    //  this makes it easier to control
    //dude.body.velocity.x *= 0.9;

    //  now let's add to the speed if the player is holding a key
    //  to do that we set the 'velocity' property on the sprite's physics Body
    //  every frame, Phaser looks at that number and uses it to update the Body's position
    //  remember - since this happens every frame, the player will get faster and faster over time
    dude.body.velocity.x = 0;

    if(dudeIsDead == false){
        if(cursors.left.isDown && gameStart == true){
            dude.body.velocity.x = -150;

            if(dude.body.touching.down){
                dude.animations.play('left');
                doubleJump = true;
            }else{
                dude.frame = 0;
            }
        }else if(cursors.right.isDown && gameStart == true){
            dude.body.velocity.x = 150;

            if(dude.body.touching.down){
                dude.animations.play('right');
                doubleJump = true;
            }else{
                dude.frame = 8;
            }
        }else{
            dude.animations.stop();
            dude.frame = 4;
        }

        // Start --- Jump and double jump function:
        // This part of code defines function and logic to "Jump" and "Double Jump".
        // When UP Key is pressed, "upPressed" immediately changes value to "true", that means preventing keep jumping if UP key is not released.
        // If character is in air (not touched to platforms or coins), "doubleJump" has value of "true".
        // So that press UP key again to double jump the character. If double jump is executed, "doubleJump" valued to false,
        // that the character cannot double jump again until touching platforms or coins.

        if(cursors.up.isDown && gameStart == true){
            if(upPressed == false && dude.body.touching.down) {
                upPressed = true;
                doubleJump = true;
                dude.body.velocity.y = -300;
            }else if(upPressed == false && doubleJump == true && !dude.body.touching.down){
                upPressed = true;
                doubleJump = false;
                dude.body.velocity.y = -350;
            }
        }

        if(gameStart == true){
            keyJump.onUpCallback = function(e){
                if (e.keyCode == 38){
                    upPressed = false;
                }else if(e.keyCode == 38 && doubleJump == true){
                    upPressed = false;
                }
            }
        }
        // End --- Jump and double jump function ///

    }else {
        dude.animations.stop();
        dude.frame = 9;
    }

    /*if(cursors.up.isDown ){

    }*/



    groundH.x = game.camera.x + 2;
    groundV.x = game.camera.x - 2;

    if(camMove == true){
        game.camera.x += cameraSpeed;
        background.tilePosition.x -= cameraSpeed * 0.25;
    }

    //  now we want to update the player sprite depending on how she is moving
    //  The image for the player sprite has 4 frames, and we can switch between them at will
    /*if (dude.body.touching.down == true){ //body.touching.down is 'true' if the body is touching another body
        dude.frame = 3; //squinting when we touch a platform
    }
    else if (dude.body.velocity.y > 0){ //if velocity.y > 0 that means the body is travelling DOWN
        dude.frame = 2; //worried when falling
    }
    else if (dude.body.velocity.y > -200){ //travelling UP, but not more than 200px/second
        dude.frame = 0; //happy when rising
    }
    else {
        dude.frame = 1; //really happy when rising fast
    }*/

    //  LOSE STATE
    //  this is an example of a rule
    //  reset the game if we fall off the bottom
    if (dude.y > game.camera.view.bottom || dude.x < game.camera.view.left){
        //game.state.restart(); //this just reloads the game state
        gameOverPage.x = (game.camera.x + game.camera.view.width * 0.5) - gameOverPage.width * 0.5;
        gameOverPage.y = (game.camera.view.height - gameOverPage.height) * 0.5;
        gameOverPage.bringToTop();
        gameStart = false;
    }

    //  We have a fixed number of platforms in the platforms group, so
    //  we want to recycle them as the player climbs up the screen
    //  so we wait until the platform scrolls off the screen, then move it up some distance

    //  Phaser groups have a function 'forEach' which lets you do a thing to every object in the group, which makes this easy
    platforms.forEach(function(somePlatform){   //  anything we do to 'somePlatform' will happen to every member of the group
            //  the camera has a rectangle object called 'view'. Rectangles have a value for 'bottom' which is the bottom edge of
            //  the game view in this case
            if (somePlatform.y > game.camera.view.bottom){ //platform is off the screen at the bottom
                var new_vertical_location = somePlatform.y - game.height * 2; //move the platform up two screen-heights
                var new_horizontal_location =  game.rnd.frac()*(game.width*0.8)+game.width*0.2; //get a new random horizontal place
                somePlatform.reset(); //sets the .exists and .alive properties to true. Note this function also resets the position to 0,0!
                somePlatform.x = new_horizontal_location; //put the platform there
                somePlatform.y = new_vertical_location;
                somePlatform.alreadyBouncedOn = false; //reset this custom variable
                somePlatform.tint = 0xffffff; //this is the color code for 'white'
            }
        });
}

function setStart(){
    gameStart = true;
    game.time.events.repeat(Phaser.Timer.SECOND * 5, 10, setSpeed, this);
}

function setCamMove(){
    camMove = true;
}

function setSpeed(){
    cameraSpeed *= 1.08;
}

function getTouched(player, objectTouched){


    if(objectTouched.name == "Coin"){
        coinSound.play();
        objectTouched.kill();
        score += 1;
    }else if(objectTouched.name == 'Monster' || objectTouched.name == 'GroundH' || objectTouched.name == 'GroundV'){
        player.body.velocity.y = 0;
        player.body.velocity.y += -300;
        dude.body.gravity.y = 600;
        dudeIsDead = true;
        camMove = false;
        groundH.body.enable = false;
        groundV.body.enable = false;

        //player.body.enable = false;

        removeGroupCollision(platforms);
        removeGroupCollision(monsters);
        removeGroupCollision(coins);
    }
}

function removeGroupCollision(_objects){
    _objects.forEach(function(_eachObject){
        _eachObject.body.enable = false;
    });
}

//  This is a custom function to handle what should happen when the player lands on a platform
//  It gets called every time the collide function detects that the player is touching a platform
function bounce(thingThatBounced,thingThatGotBouncedOn){
    //  we don't want to let the player bounce twice on a platform
    //  so we check to see if the 'alreadyBouncedOn' property is true
    if (thingThatGotBouncedOn.alreadyBouncedOn == false){ //remember for if statements we need to use == instead of =
        //  give the player a vertical velocity to boost her into the air
        //thingThatBounced.body.velocity.y = -300;

        //  add one to the score. Saying "+=" is the same as saying score = score + 1
        //score += 1;

        //  send a debug message to the javascript console. The player won't see it, but it's very useful for debugging!
        //console.log("player bounced! score: "+score);

        //  play the jump sound
        //jumpAudio.play();

        //  we don't want platforms to collide more than once, or the score will be wrong.
        //  so we immediately disable the physics body
        //thingThatGotBouncedOn.body.enabled = false;
        //thingThatGotBouncedOn.alreadyBouncedOn = true;
        //thingThatGotBouncedOn.tint = 0x800000; //This is the code for 'dark red', so the player knows not to jump here again

        //  let's make the platform disappear after a short delay, so the player knows she cannot bounce there again
        //  the delay helps it to be a little better looking and easier to see
        //  once the timer ends, it'll call the 'killSomething' function and send it the thing that got bounced on
        //game.time.events.add(Phaser.Timer.SECOND * 0.5, killSomething, this, thingThatGotBouncedOn);
    }
}

//  This is a very simple function for killing a sprite
//  We put it in a function so that we can call it using the timer event
function killSomething(something){
    something.kill(); //calling kill() on a phaser object makes it invisible and inactive
}

//  Finally, the render() function is called after update(). It's normal to use it for functions that control how the game looks
//  A lot of games won't even have a render() function because they don't need to do anything unusual!
//  But in this case we're using it to draw the player' score, and the debug collision boxes.
function render(){

    //  this is a useful way to draw placeholder text in Phaser, but don't use it for a finished game! It's ugly.
    if(gameStart == true){
        game.debug.text("Score: " + score , 50, 50); //the numbers control where the text is drawn
    }

    //  for debugging purposes, we might want to show the collision boxes for the bodies in the game
    //  this code will only run if the variable DEBUG (set at the top) is true
    if (DEBUG == true){ //show debug bodies
        game.debug.body(dude); //this function draws the body's collision box
        game.debug.body(groundH);
        game.debug.body(groundV);
        //now let's do the same thing for every member of the platforms group that is currently alive
        platforms.forEachAlive(function(p){game.debug.body(p);},this);
        monsters.forEachAlive(function(p){game.debug.body(p);}, this);
        coins.forEachAlive(function(p){game.debug.body(p);}, this);
    }
}
/*****************************************/
// Game vars;
var total_time = 120;
var num_of_elements = 100;
var score_text = null;
var time_text = null;
var timer = null;
var prev = null;
var arr = [];
var game_id = "g1l1"
var score = 0;
var game_state = "started" // can be started or ended 

var mainGameSceneConfig = {
    key: 'mainGame',
    active: false,
    visible: false,
    preload: mainGameLoader,
    create: mainGameCreate,
    update: mainGameUpdate
};

/****************************************/
// Game init and rest of phase stuff
var config = {
    type: Phaser.AUTO,
    width: 1020,
    height: 768,
    backgroundColor: '#58b07e',
 	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [
    	bootSceneConfig,
    	instructionsSceneConfig,
    	mainGameSceneConfig,
    	game_endSceneConfig
    ] 
};

//game_init
var game = new Phaser.Game(config);

function mainGameLoader(){

};


function mainGameCreate(){
	// Create scene
    this.add.image(400, 300, 'sky').setScale(2);

    platforms = this.physics.add.staticGroup();

    platforms.create(510, 752, 'ground').setScale(3).refreshBody();

	cubes = this.physics.add.staticGroup();
	arr = Array.apply(null, {length: num_of_elements}).map(Number.call, Number);
	// console.log(arr);
	arr = shuffle(arr);
	// console.log(arr);
	var x = 190 + 32;
	var y = 96;
	var style = { font: "32px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: 64, align: "center" };
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			child = this.add.sprite(x,y,'cube').setScale(0.5);
			child.setInteractive();
			child.on("clicked",printlog,this);
			text  = this.add.text(x - 16, y - 16, gennum(i,j), style);
			child.name = text.text;
			x = x + 64;
		}
		x = 190 + 32;
		y = y + 64;
	}

    this.input.on('gameobjectup', function (pointer, gameObject)
    {
        gameObject.emit('clicked', gameObject);
    }, this);

	// mouse capture
	this.input.mouse.capture = true;

	// text for time and score
	time_text = this.add.text(20,20,"Time:"+total_time,style);
	score_text = this.add.text(850,20,"Score:99",style);
	timer = this.time.addEvent({delay:1000,repeat:total_time,callback:onTimer,callbackScope:this});
};

function mainGameUpdate(){
	score_text.setText("Score:"+score);
	if (game_state == "ended"){
		this.scene.start('game_end',{game_score:score});
	}
};

function printlog(child){
	if(game_state == "started"){
		if(validate_user_input(parseInt(child.name))){
			if(prev != null){
				prev.tint = 0xffffff;
			}
			child.tint = 0x228b22;
			prev = child;
			if(parseInt(child.name) === (num_of_elements - 1)){
				endgame();
			}
		}else{
			child.tint = 0xff0000;
			endgame();
		}
	}
};


/*******************************************************/
// game logic

function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

function onTimer(){
	if(game_state == "started"){
		if(total_time > 0){
			time_text.setText("Time:" + --total_time);
		}else{
			endgame();
		}
	}
}

function gennum(x,y){
	return arr[10*x+y];
};

function validate_user_input(input){
	if(score == input){
		score++;
		return true;
	}else if(input == score - 1){
		return true;
	}
	else{
		return false;
	}
}

function endgame(){
	game_state = "ended";
}
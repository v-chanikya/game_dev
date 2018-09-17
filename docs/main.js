/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./game_params.js
/*****************************************/
// Game vars;
var num_of_elements = 100;
var game_id = "g1l1"

// CONCATENATED MODULE: ./utils.js


// local storage abstraction functions

// init
function init_storage(game_id){
	var storage_list;
	if (typeof(Storage) !== "undefined") {
	    storage_list = [];
	    window.localStorage.setItem(game_id + "storage_list",JSON.stringify(storage_list));
	    set_element_storage(game_id,"booting");
	    return true;
	} else {
	    return false;
	}
}

// set storage element
function set_element_storage(key_str,val_obj){
	var obj_str = val_obj;
	if(typeof(val_obj) !== "string"){
		obj_str = JSON.stringify(val_obj);
	}
	else{
		obj_str = val_obj;
	}

	var key_str = (key_str === game_id ? "" : game_id) + key_str;
	window.localStorage.setItem(key_str,obj_str);
	
	var storage_list = get_element_storage("storage_list");
	if(storage_list.indexOf(key_str) == -1){
		storage_list.push(key_str);
		var storage_list_str = JSON.stringify(storage_list);
		window.localStorage.setItem(game_id + "storage_list",storage_list_str);
	}
}

// get storage element
function get_element_storage(key_str){
	key_str = (key_str === game_id ? "" : game_id) + key_str;
	var val_str = window.localStorage.getItem(key_str);
	if(val_str !== null){
		if(val_str[0] === '[' || val_str[0] === '{'){
			return JSON.parse(val_str);
		}
	}
	return val_str;
}

// destroy
function destroy_storage(){
	var storage_list = get_element_storage("storage_list");
	for(var i in storage_list){
		window.localStorage.removeItem(storage_list[i]);
	}
	window.localStorage.removeItem(game_id + "storage_list");
}

// CONCATENATED MODULE: ./instructions.js


var instructionsSceneConfig = {
    key: 'instructions',
    active: false,
    visible: false,
    preload: instructionsLoader,
    create: instructionsCreate
};

function instructionsLoader(){

};

function instructionsCreate(){
	var style_head = { font: "100px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: 64, align: "center" };
	var style_data = { font: "25px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: 64, align: "center" };
	var style_start = { font: "50px Arial", fill: "#228b22", wordWrap: true, wordWrapWidth: 64, align: "center" };
	
	this.add.text(510,100,"Instructions",style_head).setOrigin(0.5,0.5);
	this.add.text(510,200,"click on consicutive numbers, in the given time",style_data).setOrigin(0.5,0.5);
	var hello = this.add.text(510,400,"click to start",style_start);
	hello.setOrigin(0.5,0.5);
	hello.setInteractive();

	this.input.on('gameobjectup', function (pointer, gameObject)
    {
        gameObject.emit('clicked', gameObject);
    }, this);
	hello.on('clicked',instructions_navigate,this);
	set_element_storage("game_state","instructions");
};

function instructions_navigate(text){
	this.scene.start('mainGame');
};

// CONCATENATED MODULE: ./game_end.js

var game_endSceneConfig = {
    key: 'game_end',
    active: false,
    visible: false,
    init:game_endInit,
    preload: game_endLoader,
    create: game_endCreate
};

function game_endInit(data){
    this.score = data.game_score;
}

function game_endLoader(){

};

function game_endCreate(){
	var style_end = { font: "100px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: 64, align: "center" };
	var style_score = { font: "50px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: 64, align: "center" };
    var style_restart = { font: "50px Arial", fill: "#228b22", wordWrap: true, wordWrapWidth: 64, align: "center" };
	
    this.input.on('gameobjectup', function (pointer, gameObject)
    {
        gameObject.emit('clicked', gameObject);
    }, this);

    this.add.text(510,200,"Game over",style_end).setOrigin(0.5,0.5);
	this.add.text(510,300,"Your score:"+this.score,style_score).setOrigin(0.5,0.5);
    this.add.text(510,400,"Restart game",style_restart).setOrigin(0.5,0.5).setInteractive().on("clicked",restart,this);
};

function restart(){
    destroy_storage();
    document.location.reload();
}

// CONCATENATED MODULE: ./boot.js



var bootSceneConfig = {
    key: 'boot',
    active: true,
    preload: bootLoader,
    create: bootCreate
};

function bootLoader(){
	this.load.image('sky', 'assets/sky.png');
	this.load.image('cube', 'assets/rocky01.png');
    this.load.image('ground', 'assets/platform.png');

    /////////////////////////////////////////////////////////
	// progress bar start //
	var progressBar = this.add.graphics();
	var progressBox = this.add.graphics();
	progressBox.fillStyle(0x222222, 0.8);
	progressBox.fillRect(240, 270, 320, 50);
	var width = this.cameras.main.width;
	var height = this.cameras.main.height;
	var loadingText = this.make.text({
	    x: width / 2,
	    y: height / 2 - 50,
	    text: 'Loading...',
	    style: {
	        font: '20px monospace',
	        fill: '#ffffff'
	    }
	});
	loadingText.setOrigin(0.5, 0.5);

	var percentText = this.make.text({
	    x: width / 2,
	    y: height / 2 - 5,
	    text: '0%',
	    style: {
	        font: '18px monospace',
	        fill: '#ffffff'
	    }
	});
	percentText.setOrigin(0.5, 0.5);

	this.load.on('progress', function (value) {
	    //console.log(value);
	    progressBar.clear();
    	progressBar.fillStyle(0xffffff, 1);
    	progressBar.fillRect(250, 280, 300 * value, 30);
    	percentText.setText(parseInt(value * 100) + '%');
	});
	            
	this.load.on('fileprogress', function (file) {
	    //console.log(file.src);
	});
	 
	this.load.on('complete', function () {
	    //console.log('complete');
	    progressBar.destroy();
		progressBox.destroy();
		loadingText.destroy();
		percentText.destroy();
	});    

	// progress bar end //
	//////////////////////////////////////////////////////////
};

function bootCreate(){
	if(get_element_storage(game_id) !== null){
		var game_state_s = get_element_storage("game_state");
		if(game_state_s === null){
			this.scene.start("instructions");
		}
		else{
			if(game_state_s === "instructions"){
				this.scene.start("instructions");
			}
			else if(game_state_s === "started" || game_state_s === "in_progress"){
				this.scene.start("mainGame");
			}
			else if(game_state_s === "ended"){
				this.scene.start("game_end",{game_score:parseInt(get_element_storage("score"))});
			}
		}
	}else{
		init_storage(game_id);
		set_element_storage("game_state","booted");
		this.scene.start('instructions');		
	}
};

// CONCATENATED MODULE: ./index.js
//import {num_of_elements, score_text, time_text, timer, prev, game_id, total_time, score, arr, game_state} from './game_params';






/*****************************************/
// Game vars;
var score_text = null;
var time_text = null;
var timer = null;
var prev = null;

// catched game vars 
var total_time = 120;
var score = 0;
var arr = [];
var game_state = "started" // can be started or in_progress or ended

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
	var game_state_s = get_element_storage("game_state");
	if (game_state_s !== "instructions"){
		game_state = game_state_s;
		score = parseInt(get_element_storage("score"));
		total_time = parseInt(get_element_storage("total_time"));
		arr = get_element_storage("arr");
		if(game_state_s === "in_progress"){

		}
	}else{
		set_element_storage("game_state","started");
		set_element_storage("score",score.toString());
		set_element_storage("total_time",total_time.toString());

		arr = Array.apply(null, {length: num_of_elements}).map(Number.call, Number);
		arr = shuffle(arr);
		set_element_storage("arr",arr);
	}

};


function mainGameCreate(){
	// Create scene
    this.add.image(400, 300, 'sky').setScale(2);

    var platforms = this.physics.add.staticGroup();

    platforms.create(510, 752, 'ground').setScale(3).refreshBody();

	var cubes = this.physics.add.staticGroup();

	var x = 190 + 32;
	var y = 96;
	var style = { font: "32px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: 64, align: "center" };
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var child = this.add.sprite(x,y,'cube').setScale(0.5);
			child.setInteractive();
			child.on("clicked",printlog,this);
			var text  = this.add.text(x - 16, y - 16, gennum(i,j), style);
			child.name = text.text;
			if(score != 0 && (parseInt(child.name) == (score - 1))){
				child.tint = 0x228b22;
				prev = child;
			}
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

	// set catch
	set_element_storage("game_state","in_progress");
	game_state = "in_progress";
};

function mainGameUpdate(){
	score_text.setText("Score:"+score);
	if (game_state == "ended"){
		set_element_storage("game_state","ended");
		this.scene.start("game_end",{game_score:score});
	}
};

function printlog(child){
	if(game_state == "in_progress"){
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

	// update catch
	set_element_storage("score",score.toString());
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
	// update catch
	set_element_storage("total_time",total_time.toString());
	if(game_state == "in_progress"){
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


/***/ })
/******/ ]);
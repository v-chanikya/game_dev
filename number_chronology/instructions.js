import {get_element_storage, set_element_storage} from './utils';

export var instructionsSceneConfig = {
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
	hello.on('clicked',navigate,this);
	set_element_storage("game_state","instructions");
};

function navigate(text){
	this.scene.start('mainGame');
};

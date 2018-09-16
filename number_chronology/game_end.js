import {get_element_storage, set_element_storage, destroy_storage} from './utils';
export var game_endSceneConfig = {
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

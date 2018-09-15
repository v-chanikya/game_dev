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
	this.add.text(510,200,"Game over",style_end).setOrigin(0.5,0.5);
	this.add.text(510,300,"Your score:"+this.score,style_score).setOrigin(0.5,0.5);
};
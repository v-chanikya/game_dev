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
	hello = this.add.text(510,400,"click to start",style_start);
	hello.setOrigin(0.5,0.5);
	hello.setInteractive();

	this.input.on('gameobjectup', function (pointer, gameObject)
    {
        gameObject.emit('clicked', gameObject);
    }, this);
	hello.on('clicked',navigate,this);
	console.log(this);
};

function navigate(text){
	this.scene.start('mainGame');
};
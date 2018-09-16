import {game_id} from './game_params';
import {init_storage, get_element_storage, set_element_storage} from './utils';

export var bootSceneConfig = {
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

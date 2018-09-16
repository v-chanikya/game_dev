// local storage abstraction functions

// init
function init_storage(game_id){
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
	if(typeof(val_obj) !== "string"){
		obj_str = JSON.stringify(val_obj);
	}
	else{
		obj_str = val_obj;
	}

	key_str = (key_str === game_id ? "" : game_id) + key_str;
	window.localStorage.setItem(key_str,obj_str);
	
	storage_list = get_element_storage("storage_list");
	if(storage_list.indexOf(key_str) == -1){
		storage_list.push(key_str);
		storage_list_str = JSON.stringify(storage_list);
		window.localStorage.setItem(game_id + "storage_list",storage_list_str);
	}
}

// get storage element
function get_element_storage(key_str){
	key_str = (key_str === game_id ? "" : game_id) + key_str;
	val_str = window.localStorage.getItem(key_str);
	if(val_str !== null){
		if(val_str[0] === '[' || val_str[0] === '{'){
			return JSON.parse(val_str);
		}
	}
	return val_str;
}

// destroy
function destroy_storage(){
	storage_list = get_element_storage("storage_list");
	for(i in storage_list){
		window.localStorage.removeItem(storage_list[i]);
	}
	window.localStorage.removeItem(game_id + "storage_list");
}
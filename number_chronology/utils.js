import {game_id} from './game_params';

// local storage abstraction functions

// init
export function init_storage(game_id){
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
export function set_element_storage(key_str,val_obj){
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
export function get_element_storage(key_str){
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
export function destroy_storage(){
	var storage_list = get_element_storage("storage_list");
	for(var i in storage_list){
		window.localStorage.removeItem(storage_list[i]);
	}
	window.localStorage.removeItem(game_id + "storage_list");
}

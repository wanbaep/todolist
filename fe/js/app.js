(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!
	$(document).ready(function(){
		showTodoByOption(2);	//All
	});

	function showTodoByOption(optionId){
		var request = "";
		if(optionId == 0){
			request = "/active";
		} else if (optionId == 1) {
			request = "/completed";
		}
		var url = "./api/todos"+request;

		$.ajax({
			url: url,
			method: 'GET',
			dataType: 'json',
			success: function(response){
				var todoList = response;
				var tag;
				var itemleft = 0;
				//console.log(todoList);

				$('.todo-list').empty();

				for(var i = 0; i < todoList.length; i++){
					var todoStr = todoList[i];

					if(todoStr.completed){	//Case of Completed
						tag = "<li class='completed' id="+todoStr.id+"><div class='view'><input class='toggle' type='checkbox' checked>";
						tag = tag + "<label>"+todoStr.todo+"</label><button class='destroy'></button></div><li>"
					} else{
						itemleft++;
						tag = "<li id="+todoStr.id+"><div class='view'><input class='toggle' type='checkbox'>";
						tag = tag + "<label>"+todoStr.todo+"</label><button class='destroy'></button></div><li>"
					}

					$('.todo-list').append(tag);
				}
				//$('.todo-count').find('strong').text(itemleft);
				itemLeft();
			}
		})

	}

	function changeSelected(option){
		$('.filters').find('li').find('a').removeClass();
		$(option).addClass('selected');
	}

	function itemLeft(){
		$.ajax({
			url: './api/todos/item',
			method: 'GET',
			dataType: 'json',
			success: function(response){
				$('.todo-count').find('strong').text(response);
			}

		})
	}

	function insert(){
		var todoVal = $('.new-todo').val();
		$('.new-todo').val("");

		$.ajax({
			url: './api/todos/',
			method: 'POST',
			headers:{ 'Content-Type':'application/json' },
			dataType: 'json',
			data: JSON.stringify({ todo: todoVal }),
			success: function(response){
				if($('#completed').hasClass('selected') == false){
					var tag = "<li id="+response.id+"><div class='view'><input class='toggle' type='checkbox'>";
					tag = tag + "<label>"+response.todo+"</label><button class='destroy'></button></div><li>"
					$('.todo-list').prepend(tag);
				}
			}
		})

		alert("할일이 등록되었습니다.");
		itemLeft();
	}

	function deleteTodo(option){
		var request="";
		var component = "#"+option;

		if(option >= 0) { //delete by Id
			request = "/"+option;
		}

		$.ajax({
			url: './api/todos'+request,
			method: 'DELETE',
			headers:{ 'Content-Type':'application/json'},
			dataType:'json',
			success: function(response){
				if(option >= 0){
					$(component).remove();
				} else{
					$('.completed').remove();
				}

				alert("할일이 삭제 되었습니다.");
			},
			error: function(e){
				alert("할일 삭제에 실패했습니다. \n\n HTTP Status Code: "+e.status);
			}
		})

		itemLeft();
	}

	function updateTodo(id, check){
		//console.log(id+check);
		var tagid = "#"+id;

		var completed;
		if(check){
			completed = 1;
		} else {
			completed = 0;
		}

		//ajax update
		$.ajax({
			url: './api/todos/'+id,
			method: 'PUT',
			headers:{ 'Content-Type':'application/json'},
			dataType:'json',
			data: JSON.stringify({ completed: completed }),
			success: function(){

				var active = $('#active').hasClass('selected');
				var comp = $('#completed').hasClass('selected');
				if(completed){	//0 to 1 completed case
					if(active){
						$(tagid).remove();
						console.log("here");
					}
				} else{
					if(comp){
						$(tagid).remove();
					}
				}

				itemLeft();
			}
		})

	}


	//active=0, completed=1, all=2
	$('#active').click(function(){
		changeSelected('#active');
		showTodoByOption(0);
		//selectTodoByComp(0);
		//$('#all').removeClass('selected');
		//$('#active').addClass('selected');
	});
	//$('#6').toggleClass('completed');

	$('#completed').click(function(){
		changeSelected('#completed');
		showTodoByOption(1);
	});

	$('#all').click(function(){
		changeSelected('#all');
		showTodoByOption(2);
	});

	$('.new-todo').keypress(function(e){
		if(e.which == 13){
			//insert
			if($('.new-todo').val()==""){
				alert("할일을 입력해주세요.");
			} else{
				insert();
			}
		}
	});

	$('.todo-list').on('click','.destroy',function(){
		var id = $(this).parents('li').attr('id');
		//delete
		deleteTodo(id);
	});

	$('.clear-completed').click(function(){
		//delete completed todo
		if($('.completed').length == 0){
			alert("완료한 할일이 없습니다!");
		} else{
			deleteTodo(-1);
		}
	});

	$('.todo-list').on('click','.toggle',function(){
		var id = $(this).parents('li').attr('id');
		var check = this.checked;
		if(check){
			$(this).parents('li').addClass('completed');
		} else{
			$(this).parents('li').removeClass('completed');
		}
		//update
		updateTodo(id, check);

	})

})(window);

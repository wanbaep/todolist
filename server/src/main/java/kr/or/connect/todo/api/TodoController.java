package kr.or.connect.todo.api;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import kr.or.connect.todo.domain.Todo;
import kr.or.connect.todo.service.TodoService;

@RestController
@RequestMapping("/api/todos")
public class TodoController {
	private final TodoService service;
	
	@Autowired
	public TodoController(TodoService service){
		this.service = service;
	}
	
	@GetMapping
	Collection<Todo> readList(){
		return service.selectAll();
	}
	
	@GetMapping("/item")
	Integer countItem(){
		return service.countTodo();
	}
	
	@GetMapping("/active")
	Collection<Todo> readActive(){
		return service.selectTodoByComp(0);
	}
	
	@GetMapping("/completed")
	Collection<Todo> readCompleted(){
		return service.selectTodoByComp(1);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	Todo create(@RequestBody Todo todo){
		return service.create(todo);
	}
	
	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	void update(@PathVariable Integer id, @RequestBody Todo todo){
		todo.setId(id);
		service.updateTodoById(todo);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	void delete(@PathVariable Integer id){
		service.deleteById(id);
	}
	
	@DeleteMapping
	@ResponseStatus(HttpStatus.NO_CONTENT)
	void deleteByComp(){
		service.deleteByComp();
	}
}

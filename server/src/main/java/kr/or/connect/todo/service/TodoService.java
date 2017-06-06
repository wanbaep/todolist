package kr.or.connect.todo.service;

import java.util.Collection;

import org.springframework.stereotype.Service;

import kr.or.connect.todo.domain.Todo;
import kr.or.connect.todo.persistence.TodoDao;

@Service
public class TodoService {
	private TodoDao dao;
	
	public TodoService(TodoDao dao){
		this.dao = dao;
	}
	
	public Todo create(Todo todo){
		Integer id = dao.insert(todo);
		todo.setId(id);
		return todo;
	}
	
	public boolean deleteById(Integer id){
		int affected = dao.deleteById(id);
		return affected == 1;
	}
	
	public boolean deleteByComp(){
		int affected = dao.deleteByComp();
		return affected == 1;
	}
	
	public boolean updateTodoById(Todo todo){
		int affected = dao.updateTodoById(todo);
		return affected == 1;
	}
	
	public Integer countTodo(){
		return dao.countTodo();
	}
	
	public Collection<Todo> selectAll(){
		return dao.selectAll();
	}
	
	public Collection<Todo> selectTodoByComp(Integer completed){
		return dao.selectTodoByComp(completed);
	}
}

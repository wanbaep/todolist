package kr.or.connect.todo.persistence;

public class TodoSqls {
	static final String DELETE_BY_ID =
			"DELETE FROM todo WHERE id= :id";
	static final String DELETE_BY_COMP =
			"DELETE FROM todo WHERE completed = :completed";
	static final String UPDATE_TODO_BY_ID = 
			"UPDATE todo SET completed = :completed WHERE id = :id";
	static final String COUNT_TODO =
			"SELECT COUNT(*) FROM todo WHERE completed = 0";
	static final String SELECT_ALL = 
			"SELECT id, todo, completed, date FROM todo ORDER BY id DESC";
	static final String SELECT_TODO_BY_COMP =
			"SELECT id, todo, completed, date FROM todo where completed = :completed ORDER BY id DESC";
	
}

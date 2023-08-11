import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import './Card.scss';

interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

const Card: React.FC<{
  index: number;
  todo: Todo;
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}> = ({ index, todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const editInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const handleEditCancel = () => setEditTodo(todo.todo);

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  useEffect(() => {
    editInputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`Card ${snapshot.isDragging ? 'drag' : ''}`}
        >
          {edit ? (
            <div className='Card__Editing'>
              <input
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
                className='Card__Content'
                ref={editInputRef}
              />
              <div className='Card__Edit'>
                <button className='Card__Edit__Save'>Save</button>
                <button
                  className='Card__Edit__Cancel'
                  onClick={handleEditCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : todo.isDone ? (
            <s className='Card__Content'>{todo.todo}</s>
          ) : (
            <p className='Card__Content'>{todo.todo}</p>
          )}
          <div className='Card__Labels'>
            <p className='label done' onClick={() => handleDone(todo.id)}>
              Done
            </p>
            <p
              className='label edit'
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              Edit
            </p>
            <p className='label delete' onClick={() => handleDelete(todo.id)}>
              Delete
            </p>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default Card;

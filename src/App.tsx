import Input from './components/Input';
import Card from './components/Card';

import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

import { useState } from 'react';

import './App.scss';

interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<string>('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo('');
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    const active = todos;
    const complete = completedTodos;

    if (source.droppableId === 'TodosList') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <div className='App'>
      <h1>TODO APP</h1>
      <Input todo={todo} setTodo={setTodo} handleAdd={handleAdd} />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className='Todos'>
          <div className='Todos__Container'>
            <Droppable droppableId='TodosList'>
              {(provided, snapshot) => (
                <div
                  className={`Todos__Container__Section current ${
                    snapshot.isDraggingOver ? 'dragactive' : ''
                  }`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h1 className='Todos__Container__Section__Header'>
                    Current Tasks
                  </h1>
                  {todos?.map((todo, index) => (
                    <Card
                      index={index}
                      todos={todos}
                      todo={todo}
                      key={todo.id}
                      setTodos={setTodos}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId='TodosRemove'>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`Todos__Container__Section completed ${
                    snapshot.isDraggingOver ? 'dragcomplete' : 'remove'
                  }`}
                >
                  <h1 className='Todos__Container__Section__Header'>
                    Completed Tasks
                  </h1>
                  {completedTodos?.map((todo, index) => (
                    <Card
                      index={index}
                      todos={completedTodos}
                      todo={todo}
                      key={todo.id}
                      setTodos={setCompletedTodos}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;

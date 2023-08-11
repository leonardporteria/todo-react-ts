import { useRef } from 'react';

import './Input.scss';

interface props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const Input: React.FC<props> = ({ todo, setTodo, handleAdd }) => {
  const todoRef = useRef<HTMLInputElement>(null);

  return (
    <div className='Input'>
      <form
        className='Input__Form'
        onSubmit={(e) => {
          handleAdd(e);
          setTodo('');
          todoRef.current?.blur();
        }}
      >
        <input
          type='text'
          placeholder='Enter Todo Task'
          ref={todoRef}
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className='Input__Form__Input'
        />
        <button className='Input__Form__Button'>Add +</button>
      </form>
    </div>
  );
};
export default Input;

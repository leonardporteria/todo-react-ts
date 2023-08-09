import './Input.scss';

const Input: React.FC = () => {
  return (
    <div className='Input'>
      <form>
        <input type='text' />
        <button>Add +</button>
      </form>
    </div>
  );
};

export default Input;

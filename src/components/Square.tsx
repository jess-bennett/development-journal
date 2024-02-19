const Square: React.FC<{ value: string; onSquareClick: () => void }> = ({
  value,
  onSquareClick,
}) => {
  return (
    <button className="c-btn c-btn--square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

export default Square;

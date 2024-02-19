const Square: React.FC<{ value: string; onSquareClick: () => void }> = ({
  value,
  onSquareClick,
}) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

export default Square;

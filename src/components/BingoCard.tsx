import { useState } from "react";

interface CardData {
  marked: boolean;
  phrase: string;
}

function BingoCard(data: CardData) {
  const [color, setColor] = useState(data.marked);

  const handleClick = () => {
    setColor(!color);
    // setColor(true);
    // todo send request with update to set as done
  };

  return (
    <>
      <div
        key={data.phrase}
        className={
          color
            ? "border-2 rounded-lg bg-green-400 m-2 flex items-center justify-center cursor-pointer select-none"
            : "border-2 rounded-lg bg-red-400 m-2 flex items-center justify-center cursor-pointer select-none"
        }
        onClick={handleClick}
      >
        <p className="text-center text-xl">{data.phrase}</p>
      </div>
    </>
  );
}

export default BingoCard;

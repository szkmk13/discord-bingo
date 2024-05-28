import { useRef } from "react";

function WinningModal({ order }:{order:boolean[]}) {
  const textRef = useRef(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy).catch((err) => {
      console.error("Failed to copy text: ", err);
    });
  };
  console.log(order);
  const rows = [];
  for (let i = 0; i < 5; i++) {
    rows.push(order.slice(i * 5, i * 5 + 5));
  }
  let textToCopy = "";
  for (let i = 0; i < order.length; i++) {
    if (order[i]) {
      textToCopy += "🟩";
    } else {
      textToCopy += "🟥";
    }
    if ((i + 1) % 5 === 0) {
      textToCopy += "\n";
    }
  }
  console.log(textToCopy);

  return (
    <>
      <div className="grid grid-cols-3 gap-4 border-2 rounded-lg bg-zinc-300 m-4 justify-center items-center">
        {/* <div className="col-span-3 border-2 rounded-lg bg-zinc-300 m-4 flex justify-center items-center"> */}
        <div className="col-span-1">BIG WIN GRATULACJE, share bingo:</div>
        <div
          ref={textRef}
          className="whitespace-pre-line col-span-1 flex justify-center items-center"
        >
          {textToCopy}
        </div>
        <button onClick={copyToClipboard} className="col-span-1">
          Copy to clipboard
        </button>
        {/* </div> */}
      </div>
    </>
  );
}

export default WinningModal;

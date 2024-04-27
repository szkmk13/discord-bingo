import { useGetCompleted } from "../api/getCompletedForToday";

function WinningModal() {
  const { data: completed } = useGetCompleted();

  if (completed) {
    return (
      <>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3 border-2 rounded-lg bg-zinc-400 h-48 ">
            <div> BIG WIN GRATULACJE</div>
            <div>Share bingo:</div>
          </div>
        </div>
      </>
    );
  }
  return <></>;
}

export default WinningModal;

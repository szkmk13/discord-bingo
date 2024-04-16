import moment from 'moment';



function Streak() {

    const currentDate = moment().format('DD/MM/YYYY');
    return (
    <>
      <div>
      Discord bingo for {currentDate}
      </div>
    </>
  );
}

export default Streak;

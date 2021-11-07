import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { MemberVoteStatus } from '../../../model/MemberVote';
import './timer.css';

export default function Timer(): JSX.Element {
  const settings = useAppSelector((state) => state.game.room.gameSettings);
  const timer = useAppSelector((state) => state.game.memberVote.timer);
  const [minutes, setMinutes] = useState(timer.min);
  const [seconds, setSeconds] = useState(timer.sec);
  const voteStatus = useAppSelector((state) => state.game.memberVote.status);


  useEffect(() => {
    if (voteStatus === MemberVoteStatus.IN_PROGRESS) {
      setTimeout(() => {
        if (seconds !== 0) {
          setSeconds(seconds - 1);
        } else if (seconds === 0 && minutes !== 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }      
      }, 1000);
    } else {
      setMinutes(parseInt(settings.timeMin, 10));
      setSeconds(parseInt(settings.timeSec, 10));
    }
  }, [voteStatus, seconds]);

  return (
    <div className="timer">
      <span className="timer__min">{minutes.toString().padStart(2, '0')}</span>
      <span className="timer__sep">:</span>
      <span className="timer__sec">{seconds.toString().padStart(2, '0')}</span>
    </div>
  );
}




// import React, { useEffect, useState } from 'react';
// import { useAppSelector } from '../../../app/hooks';
// import { MemberVoteStatus } from '../../../model/MemberVote';
// import './timer.css';

// export interface TimerProps {
//   min: string,
//   sec: string
// }

// export default function Timer(props: TimerProps): JSX.Element {
//   const settings = useAppSelector((state) => state.game.room.gameSettings);
//   const game = useAppSelector((state) => state.game);

//   const [minutes, setMinutes] = useState(game.memberVote.timer.min);
//   const [seconds, setSeconds] = useState(game.memberVote.timer.sec);
//   const voteStatus = useAppSelector((state) => state.game.memberVote.status);

//   useEffect(() => {
//     if (voteStatus === MemberVoteStatus.IN_PROGRESS) {
//       setTimeout(() => {
//         if (seconds !== '00') {
//           setSeconds((parseInt(seconds, 10) - 1).toString().padStart(2, '0'));
//         } else if (seconds === '00' && minutes !== '0') {
//           setMinutes((parseInt(minutes, 10) - 1).toString());
//           setSeconds('59');
//         }      
//       }, 1000);}
//       else {
//         setMinutes(settings.timeMin);
//         setSeconds(settings.timeSec);
//       }

//   }, [voteStatus, seconds]);

//   return (
//     <div className="timer">
//       <span className="timer__min">{minutes}</span>
//       <span className="timer__sep">:</span>
//       <span className="timer__sec">{seconds}</span>
//     </div>
//   );
//    }

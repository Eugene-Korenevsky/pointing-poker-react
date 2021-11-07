import React from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { IssueUtil } from '../../../../utils/IssueUtil';
import GameCard from '../../../common/gameCard';
import './statistics.css';

export default function Statistics(): JSX.Element {
  const gameSettings = useAppSelector((state) => state.game.room.gameSettings);
  const currentIssue = useAppSelector((state) => state.game.memberVote.currentIssue);
  const issues = useAppSelector((state) => state.game.room.issues);
  const statistics = IssueUtil.getCurrentIssueStatistics(issues, currentIssue);
  return (
    <>
      {statistics?.length !== 0 && (
        <div>
          <h2 className="statistic__title">Statistics:</h2>
          <div className="statistic__wrap">
            {statistics?.map((statisticItem, index) => {
              let { percentage } = statisticItem;
              const isNotIntegerPercentage = /\./.test(percentage);
              if (isNotIntegerPercentage) {
                const numbersAfterPoint = percentage.split('.')[1].length;
                if (numbersAfterPoint > 2) {
                  percentage = Number(percentage).toFixed(2);
                }
              }
              return (
                <div key={index} className="statistic__card-wrap">
                  <GameCard value={statisticItem.value} scopeTypeShort={gameSettings.scopeTipeShort} statistic={true} />
                  <div className="statistic__score">{`${percentage}%`}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

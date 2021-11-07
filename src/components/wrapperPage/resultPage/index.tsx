import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import ExportToExcel from './exportToExcel';
import GameCard from '../../common/gameCard';
import CardIssue from '../gamePage/cardIssue';
import './resultPage.css';

export type ResultInfo = {
  ' ': string;
  '  ': string;
  '   '?: string;
  '    '?: string;
};

export default function ResultPage(): JSX.Element {
  const gameSettings = useAppSelector((state) => state.gameSettings);
  const fileName = 'game-result';
  const issues = useAppSelector((state) => state.game.room.issues);
  const resultReal: ResultInfo[] = [];

  issues.forEach((issue) => {
    resultReal.push(
      { ' ': 'Issue', '  ': issue.name },
      { ' ': 'Priority', '  ': issue.priority },
      { ' ': 'Score', '  ': issue.score || '-' },
      {
        ' ': 'Link',
        '  ': issue.link,
      },
    );
    if (issue.statistic) {
      resultReal.push({ ' ': 'Cards:', '  ': '№', '   ': 'Value', '    ': 'Percentage' });
      issue.statistic?.forEach((obj, index) => {
        resultReal.push({ ' ': '', '  ': (index + 1).toString(), '   ': obj.value, '    ': obj.percentage });
      });
    }

    resultReal.push({ ' ': '', '  ': '' });
  });

  return (
    <section className="result">
      <ul className="result__list">
        {issues.map((issue) => (
          <li className="result__item" key={issue.id}>
            <CardIssue issue={issue.name} priority={issue.priority} link={issue.link} score={'-'} current={false} />
            <div className="result__item-info-wrap">
              {issue.statistic ? (
                issue.statistic?.map((statisticItem, key) => {
                  let { percentage } = statisticItem;
                  const isNotIntegerPercentage = /\./.test(percentage);
                  if (isNotIntegerPercentage) {
                    const numbersAfterPoint = percentage.split('.')[1].length;
                    if (numbersAfterPoint > 2) {
                      percentage = Number(percentage).toFixed(2);
                    }
                  }
                  return (
                    <div key={key} className="result__item-info">
                      <GameCard value={statisticItem.value} scopeTypeShort={gameSettings.scopeTipeShort} />
                      <div className="result__item-info-score">{`${percentage}%`}</div>
                    </div>
                  );
                })
              ) : (
                <div className="result__item-info-score"> unknown </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      <ExportToExcel data={resultReal} fileName={fileName} />
    </section>
  );
}

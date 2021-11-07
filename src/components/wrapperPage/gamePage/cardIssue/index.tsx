import React from 'react';
import './cardIssue.css';

export default function CardIssue(props: {
  issue: string;
  priority: string;
  link: string;
  score: string;
  current: boolean;
}): JSX.Element {
  return (
    <a
      href={props.link}
      target="_blank"
      rel="noopener noreferrer"
      className={props.current ? 'card-issue card-issue_active' : 'card-issue'}
      title="Issue link"
      style={{ pointerEvents: props.link ? 'auto' : 'none' }}
    >
      {props.current && <span className="card-isssue__current">Current</span>}
      <div className="card-isssue__wrap">
        <p className="card-isssue__text">{props.issue}</p>
        <span className="card-isssue__score">{props.score}</span>
      </div>
      <span className="card-isssue__priority">{props.priority}</span>
    </a>
  );
}

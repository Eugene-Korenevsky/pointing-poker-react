import React from 'react';
import './vote-block.css';

export interface VoteResultCardProps {
  value: string;
}

export default function VoteResultCard(props: VoteResultCardProps): JSX.Element {

  return <div className="voite-result-card">{props.value}</div>
}
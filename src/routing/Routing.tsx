import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ConnectRout from '../components/connectRout';
import MainPage from '../components/mainPage';
import { NotFoundPage } from '../components/notFound';
import WrapperPage from '../components/wrapperPage';

export default function Routing(): JSX.Element {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/game/:id" component={WrapperPage} />
        <Route exact path="/connect/:id" component={ConnectRout} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

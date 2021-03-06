import React from 'react';
import { HashRouter, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute} from '../util/route_util';
import { AuthForm } from './user_auth/auth_form';
import { Settings } from './settings';
import { BeanForm } from './beans/bean_form';
import { NoteForm } from './beans/bean_detail/note_form';
import { Home } from './home';
import { BeanDetail } from './beans/bean_detail/bean_detail';
import { NoteIndex } from './beans/bean_detail/note_index';
import { SongSearch } from './beans/bean_detail/song_search';


export const App = () => (
  <HashRouter>
    <div className="main">
      <AuthRoute exact path="/" component={AuthForm} />
      <Switch>
        {/* <ProtectedRoute path="/beans/edit" type="edit" component={BeanForm} /> */}
        <ProtectedRoute path="/beans/new" type="new" component={BeanForm} />
        <ProtectedRoute path="/notes/new" type="new" component={NoteForm} />
        <ProtectedRoute path="/beans/:id" component={BeanDetail} />
        <ProtectedRoute path="/notes/bean/:id" component={NoteIndex} />
        <ProtectedRoute path="/settings" component={Settings} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute path="/spotify/bean/:id" component={SongSearch}/>
        <ProtectedRoute path="/spotify/login" component={() => {
          window.location.href=`https://coffeenote/api/spotify/login/${window.currentUser.id}`;
          return null;
        }}/>
      </Switch>
    </div>
  </HashRouter>
);
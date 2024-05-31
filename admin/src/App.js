// admin/src/App.js
import React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from './dataProvider';
import { UserList, UserEdit, UserCreate } from './components/UserList';
import { PathList, PathEdit, PathCreate } from './components/PathList';

const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} />
        <Resource name="paths" list={PathList} edit={PathEdit} create={PathCreate} />
    </Admin>
);

export default App;

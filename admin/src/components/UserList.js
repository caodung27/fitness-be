// admin/src/components/UserList.js
import React from 'react';
import { List, Datagrid, TextField, EmailField, EditButton, DeleteButton, Edit, SimpleForm, TextInput, Create } from 'react-admin';

export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="phone" />
            <TextField source="location" />
            <TextField source="gender" />
            <TextField source="age" />
            <TextField source="weight" />
            <TextField source="height" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const UserEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="email" />
            <TextInput source="phone" />
            <TextInput source="location" />
            <TextInput source="gender" />
            <TextInput source="age" />
            <TextInput source="weight" />
            <TextInput source="height" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="email" />
            <TextInput source="phone" />
            <TextInput source="location" />
            <TextInput source="gender" />
            <TextInput source="age" />
            <TextInput source="weight" />
            <TextInput source="height" />
        </SimpleForm>
    </Create>
);

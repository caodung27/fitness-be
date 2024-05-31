// admin/src/components/PathList.js
import React from 'react';
import { List, Datagrid, TextField, NumberField, ReferenceField, EditButton, DeleteButton, Edit, SimpleForm, TextInput, Create, NumberInput, ReferenceInput, SelectInput } from 'react-admin';

export const PathList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="type" />
            <TextField source="start.coordinates" label="Start Coordinates" />
            <TextField source="end.coordinates" label="End Coordinates" />
            <NumberField source="speed" />
            <NumberField source="distance" />
            <NumberField source="steps" />
            <NumberField source="calories" />
            <ReferenceField source="userId" reference="users">
                <TextField source="name" />
            </ReferenceField>
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const PathEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="type" />
            <TextInput source="start.coordinates" label="Start Coordinates" />
            <TextInput source="end.coordinates" label="End Coordinates" />
            <NumberInput source="speed" />
            <NumberInput source="distance" />
            <NumberInput source="steps" />
            <NumberInput source="calories" />
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const PathCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="type" />
            <TextInput source="start.coordinates" label="Start Coordinates" />
            <TextInput source="end.coordinates" label="End Coordinates" />
            <NumberInput source="speed" />
            <NumberInput source="distance" />
            <NumberInput source="steps" />
            <NumberInput source="calories" />
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

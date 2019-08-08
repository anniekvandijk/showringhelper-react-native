import React from 'react';
import {
    Header, Left, Body, Title, Button, Icon } from 'native-base';

function AppHeader() {
    return (
    <Header>
    <Left>
        <Button transparent>
        <Icon name='menu' />
        </Button>
    </Left>
    <Body>
        <Title>Showring helper</Title>
    </Body>
    </Header>
    )
}

export default AppHeader;

import React from 'react';
import { Text, Card, CardItem, Body, H1 } from 'native-base';

function NoShowCard() {
  return (
    <Card>
      <CardItem header bordered>
        <H1>No available shows</H1>
      </CardItem>
      <CardItem bordered>
        <Body>
          <Text>There are no active shows</Text>
        </Body>
      </CardItem>
    </Card>
  );
}

export default NoShowCard;

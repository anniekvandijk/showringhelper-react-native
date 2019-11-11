import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, Card, CardItem, Body, H1 } from 'native-base';

function NoShowCard() {
  const [t] = useTranslation();
  return (
    <Card>
      <CardItem header bordered>
        <Text>{t('components.noShowCard.header')}</Text>
      </CardItem>
      <CardItem bordered>
        <Body>
          <Text>{t('components.noShowCard.body')}</Text>
        </Body>
      </CardItem>
    </Card>
  );
}

export default NoShowCard;

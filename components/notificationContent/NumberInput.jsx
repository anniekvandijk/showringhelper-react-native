import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'native-base';


function NumberInput({ value, onChange }) {
  const [t] = useTranslation();

  return (
    <Input
      name="numberInput"
      placeholder={t('pages.notificationContent.ringNumberPlaceholder')}
      onChangeText={text => onChange(text)}
      value={value}
      maxLength={10}
    />
  );
}

export default NumberInput;

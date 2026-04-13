import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';

const LanguageSwitch = () => {
  const { t } = useTranslation();
  const isEnglish = i18n.language === 'en';

  const toggleSwitch = () => {
    i18n.changeLanguage(isEnglish ? 'vi' : 'en');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t('language')}</Text>

      <View style={styles.switchContainer}>
        <Text style={styles.langText}>{isEnglish ? 'EN' : 'VI'}</Text>

        <Switch value={isEnglish} onValueChange={toggleSwitch} />
      </View>
    </View>
  );
};

export default LanguageSwitch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
  },
  langText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

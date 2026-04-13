import React, { useCallback, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Props } from '../navigation/AppNavigator';
import { RootState } from '../store';
import { initLogs } from '../store/logSlice';
import LogItem from '../components/LogItem';
import LanguageSwitch from '../components/LanguageSwitch';
import AddButton from '../components/AddButton';
import { Log } from '../types/log';

export default function LogListScreen({ navigation }: Props) {
  const logs = useSelector((state: RootState) => state.logs.logs);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initLogs());
  }, [dispatch]);

  const renderItem = useCallback(
    ({ item }: { item: Log }) => (
      <LogItem
        item={item}
        onEdit={log => navigation.navigate('Form', { id: log.id })}
      />
    ),
    [navigation],
  );

  return (
    <View style={styles.main}>
      <Text style={styles.title}>{t('title')}</Text>

      <LanguageSwitch />

      <FlatList
        data={logs}
        extraData={i18n.language}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />

      <AddButton handleSubmit={() => navigation.navigate('Form', {})} />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
    marginVertical: 12,
  },
});

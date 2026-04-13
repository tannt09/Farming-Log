import React, { useCallback, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '../store';
import { initLogs } from '../store/logSlice';
import LogItem from '../components/LogItem';
import AddButton from '../components/AddButton';
import { Log } from '../types/log';
import { useNavigation } from '@react-navigation/native';
import { FormProps } from '../navigation/AppNavigator';

export default function LogListScreen() {
  const logs = useSelector((state: RootState) => state.logs.logs);
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<FormProps['navigation']>();

  useEffect(() => {
    dispatch(initLogs());
  }, [dispatch]);

  const renderItem = useCallback(
    ({ item }: { item: Log }) => (
      <LogItem
        item={item}
        lang={i18n.language}
        onEdit={log => navigation.navigate('Form', { id: log.id })}
      />
    ),
    [i18n.language, navigation],
  );

  return (
    <View style={styles.main}>
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

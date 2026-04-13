import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Log } from '../types/log';

const LogItem = ({
  item,
  onEdit,
}: {
  item: Log;
  onEdit: (log: Log) => void;
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.name}>{t(item.name)}</Text>
        <Text style={styles.status}>{item.date}</Text>
        <Text style={styles.status}>{t(item.notes)}</Text>
        <Text style={styles.status}>{t(item.status)}</Text>
      </View>

      <TouchableOpacity style={styles.editBtn} onPress={() => onEdit(item)}>
        <Text style={styles.editText}>{t('edit')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(LogItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 14,
    color: 'gray',
  },
  editBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#2196F3',
    borderRadius: 6,
    marginLeft: 10,
  },
  editText: {
    color: '#fff',
    fontWeight: '600',
  },
});

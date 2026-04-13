import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/AppNavigator';
import { addLog, updateLog } from '../store/logSlice';
import { Log } from '../types/log';
import uuid from 'react-native-uuid';
import { RootState } from '../store';

type FormRouteProp = RouteProp<RootStackParamList, 'Form'>;

export default function LogFormScreen() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute<FormRouteProp>();

  const { id } = route.params || {};

  const logs = useSelector((state: RootState) => state.logs.logs);

  const editingLog = logs.find((l: Log) => l.id === id);

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState(false); // false = pending, true = completed

  // load data khi edit
  useEffect(() => {
    if (editingLog) {
      setName(editingLog.name);
      setDate(editingLog.date);
      setNotes(editingLog.notes);
      setStatus(editingLog.status === 'COMPLETED');
    }
  }, [editingLog]);

  const validate = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Activity name is required');
      return false;
    }
    if (!date.trim()) {
      Alert.alert('Error', 'Date is required');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const newLog: Log = {
      id: editingLog ? editingLog.id : uuid.v4().toString(),
      name,
      date,
      notes,
      status: status ? 'COMPLETED' : 'PENDING',
    };

    if (editingLog) {
      dispatch(updateLog(newLog));
    } else {
      dispatch(addLog(newLog));
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{editingLog ? t('edit') : t('add')}</Text>

      {/* Activity Name */}
      <Text>{t('Activity Name')}</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Seeding..."
      />

      {/* Date */}
      <Text>{t('Date')}</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
      />

      {/* Notes */}
      <Text>{t('Notes')}</Text>
      <TextInput
        // eslint-disable-next-line react-native/no-inline-styles
        style={[styles.input, { height: 80 }]}
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      {/* Status */}
      <View style={styles.row}>
        <Text>
          {t('Status')}: {status ? t('COMPLETED') : t('PENDING')}
        </Text>
        <Switch value={status} onValueChange={setStatus} />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
        <Text style={styles.saveButtonText}>{t('save')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 8,
    borderRadius: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  saveButton: {
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

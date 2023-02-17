import AsyncStorage from '@react-native-async-storage/async-storage';

export const KEYS = {
  Theme: 'theme',
};

export const storeData = async (key: string, value: Object): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getData = async (key: string): Promise<string | null> => {
  const jsonValue = await AsyncStorage.getItem(key);
  return jsonValue != null ? JSON.parse(jsonValue) : null;
};

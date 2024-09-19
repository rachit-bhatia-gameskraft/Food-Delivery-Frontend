import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const Searchbar: React.FC<any> = ({debouncedFetchQueryData}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    debouncedFetchQueryData(query);
  };

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for restaurants,dishes,etc..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  itemText: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'lightgrey',
  },
  list: {
    flex: 1,
  },
});

export default Searchbar;

import { useRoute } from '@react-navigation/native';
import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
const Searchbar: React.FC<any> = ({onSearchQueryChange}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
const route = useRoute();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearchQueryChange(query);
  };
  return (
    <View style={[styles.container,route.name === 'Home' && styles.searchbarheight]}>
      <View style={styles.list}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search delicious food..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchbarheight:{
    flex:1,
  },
  container: {
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
  },
});

export default Searchbar;

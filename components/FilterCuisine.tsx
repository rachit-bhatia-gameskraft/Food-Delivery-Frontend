import React, {useState} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';


type FilterCuisineProps = {
  cuisines: string[];
  onCuisineSelect: (cuisine: string | null) => void;
};
const FilterCuisine: React.FC<FilterCuisineProps> = ({
  cuisines,
  onCuisineSelect,
}) => {
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);

  const handleCuisinePress = (cuisine: string) => {
    if (selectedCuisine === cuisine) {
      setSelectedCuisine(null);
      onCuisineSelect(null);
    } else {
      setSelectedCuisine(cuisine);
      onCuisineSelect(cuisine);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {cuisines.map((cuisine,index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.cuisineButton,
              selectedCuisine === cuisine && styles.selectedCuisineButton,
            ]}
            onPress={() => handleCuisinePress(cuisine)}>
            <Text
              style={[
                styles.cuisineText,
                selectedCuisine === cuisine && styles.selectedCuisineText,
              ]}>
              {cuisine}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {selectedCuisine && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => {
            setSelectedCuisine(null);
            onCuisineSelect(null);
          }}>
          <Text style={styles.clearButtonText}>Clear Filter</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  cuisineButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#EEE',
    marginRight: 10,
  },
  selectedCuisineButton: {
    backgroundColor: '#FF6347',
  },
  cuisineText: {
    fontSize: 16,
    color: '#000',
  },
  selectedCuisineText: {
    color: '#FFF',
  },
  clearButton: {
    marginTop: 10,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FF6347',
    borderRadius: 20,
  },
  clearButtonText: {
    color: '#FFF',
  },
});

export default FilterCuisine;

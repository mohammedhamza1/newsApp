import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Alert,
} from 'react-native';
import { NewsArticle, TimeFilter } from '../types';
import {
  fetchMostViewedArticles,
  searchArticles,
} from '../services/nyTimesApi';
import ArticleCard from '../components/ArticleCard';

const DashboardScreen: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<TimeFilter>('1');
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const periods = [
    { key: '1' as TimeFilter, label: '1 Day' },
    { key: '7' as TimeFilter, label: '7 Days' },
    { key: '30' as TimeFilter, label: '30 Days' },
  ];

  const loadArticles = async (period: TimeFilter, showLoader = true) => {
    if (showLoader) {
      setIsLoading(true);
    }

    try {
      const response = await fetchMostViewedArticles(period);
      setArticles(response.results);
      console.log('response', response.results);
      setFilteredArticles(searchArticles(response.results, searchTerm));
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to load articles. Please check your internet connection and try again.',
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadArticles(selectedPeriod);
  }, [selectedPeriod]);

  useEffect(() => {
    setFilteredArticles(searchArticles(articles, searchTerm));
  }, [searchTerm, articles]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadArticles(selectedPeriod, true);
  };

  const renderArticle = ({ item }: { item: NewsArticle }) => {
    return <ArticleCard item={item} />;
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>News Dashboard</Text>

        <TextInput
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Search articles..."
          clearButtonMode="while-editing"
        />

        <View style={styles.filterContainer}>
          {periods.map(period => (
            <TouchableOpacity
              key={period.key}
              style={[
                styles.filterButton,
                selectedPeriod === period.key && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedPeriod(period.key)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedPeriod === period.key &&
                    styles.filterButtonTextActive,
                ]}
              >
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filteredArticles}
        renderItem={renderArticle}
        keyExtractor={(item, index) => `${item.url}-${index}`}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {isLoading ? 'Loading articles...' : 'No articles found'}
            </Text>
          </View>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    marginBottom: 15,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 4,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
});

export default DashboardScreen;

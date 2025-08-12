import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
  Image,
} from 'react-native';
import { NewsArticle } from '../types';

interface ArticleCardProps {
  item: NewsArticle;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ item }) => {
  const handleArticlePress = (url: string) => {
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to open article');
    });
  };

  const getImageUrl = (article: NewsArticle): string | null => {
    if (article.media && article.media.length > 0) {
      const mediaMetadata = article.media[0]['media-metadata'];
      const largeImage = mediaMetadata.find(
        meta => meta.format === 'mediumThreeByTwo440',
      );
      return largeImage?.url || mediaMetadata[0]?.url || null;
    }
    return null;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return '1 day ago';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const imageUrl = getImageUrl(item);

  return (
    <TouchableOpacity
      style={styles.articleCard}
      onPress={() => handleArticlePress(item.url)}
    >
      {imageUrl && (
        <Image source={{ uri: imageUrl }} style={styles.articleImage} />
      )}
      <View style={styles.articleContent}>
        <Text style={styles.articleTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.articleAbstract} numberOfLines={3}>
          {item.abstract}
        </Text>
        <View style={styles.articleMeta}>
          <Text style={styles.articleByline}>{item.byline}</Text>
          <Text style={styles.articleDate}>
            {formatDate(item.published_date)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  articleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  articleImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  articleContent: {
    padding: 16,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
    lineHeight: 24,
  },
  articleAbstract: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },
  articleMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  articleByline: {
    fontSize: 12,
    color: '#999999',
    flex: 1,
  },
  articleDate: {
    fontSize: 12,
    color: '#999999',
  },
});

export default ArticleCard;
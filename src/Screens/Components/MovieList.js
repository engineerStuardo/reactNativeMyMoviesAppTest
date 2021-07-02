import React from 'react';
import { View, Text } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

export const MovieList = ({
  title,
  release_date,
  overview,
  vote_average,
  poster_path,
}) => {
  return (
    <View style={{ margin: 25 }}>
      <Card>
        <Card.Cover
          style={{ height: 500, resizeMode: 'contain' }}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${poster_path}`,
          }}
        />
        <Card.Content>
          <Title style={{ textAlign: 'center' }}>{title}</Title>
          <Paragraph style={{ textAlign: 'center' }}>{release_date}</Paragraph>
        </Card.Content>
        <Card.Content>
          <Paragraph style={{ textAlign: 'center' }}>{overview}</Paragraph>
          <Paragraph style={{ textAlign: 'center' }}>
            Rating: {vote_average} / 10
          </Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

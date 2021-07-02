import React from 'react';
import { View } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';

import star from '../../../assets/star';

export const MovieList = ({
  title,
  release_date,
  overview,
  vote_average,
  poster_path,
}) => {
  return (
    <View style={{ margin: 25 }}>
      <Card style={{ elevation: 10 }}>
        <Card.Cover
          style={{ height: 500, resizeMode: 'contain' }}
          source={
            poster_path
              ? { uri: `https://image.tmdb.org/t/p/w500${poster_path}` }
              : require('../../../assets/no-poster-available.jpg')
          }
        />
        <Card.Content>
          <Title style={{ textAlign: 'center' }}>
            {title ? title : 'No title available'}
          </Title>
          <Paragraph style={{ textAlign: 'center' }}>
            {release_date ? release_date : 'No release date available'}
          </Paragraph>
        </Card.Content>
        <Card.Content>
          <Paragraph style={{ textAlign: 'center' }}>
            {overview ? overview : 'No overview available'}
          </Paragraph>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Paragraph style={{ textAlign: 'center' }}>
              Rating: {vote_average ? vote_average : 0} / 10{' '}
            </Paragraph>
            <SvgXml xml={star} width={20} height={20} />
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

import React, { useState } from 'react';
import { Dimensions } from 'react-native';

import { SearchHeaderContainer } from '../Styles/SearchHeaderStyles';
import { SearchHeaderInput } from '../Components/SearchHeaderInput';
import { IconButtonSearch } from '../Components/IconButton';

const windowWidth = Dimensions.get('window').width;

export const SearchHeader = ({ isHome, setText }) => {
  const [search, setSearch] = useState('');

  return (
    <SearchHeaderContainer windowWidth={windowWidth}>
      <SearchHeaderInput
        isHome={isHome}
        search={search}
        setSearch={setSearch}
        setText={setText}
      />
      <IconButtonSearch search={search} isHome={isHome} />
    </SearchHeaderContainer>
  );
};

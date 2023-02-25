import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Title, Text} from 'react-native-paper';
import {map} from 'lodash';
import CarouselVertical from '../components/CarouselVertical';
import CarouselMulti from '../components/CarouselMulti';
import {
  getNewsMoviesApi,
  getAllGenresApi,
  getGenreMoviesApi,
} from '../api/movies';
import ScreenLoading from '../components/ScreenLoading';

export default function Home(props) {
  const {navigation} = props;
  const [newMovies, setNewMovies] = useState(null);
  const [genreList, setGenreList] = useState([]);
  const [genreSelected, setGenreSelected] = useState(28);
  const [genreMovies, setGenreMovies] = useState(null);

  /***************peticion async************************ */
  // useEffect(async () => {
  //   const data = await getNewsMoviesApi();
  //   setNewMovies(data);
  // }, []);
  /***************peticion async************************ */

  useEffect(() => {
    getNewsMoviesApi().then(response => {
      setNewMovies(response.results);
    });
  }, []);

  useEffect(() => {
    getAllGenresApi().then(response => {
      setGenreList(response.genres);
    });
  }, []);

  useEffect(() => {
    getGenreMoviesApi(genreSelected).then(response => {
      setGenreMovies(response.results);
    });
  }, [genreSelected]);

  const onChangeGenre = newGenreId => {
    setGenreSelected(newGenreId);
  };

  if (!newMovies) return <ScreenLoading size="large" color="#FFA833" />;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {newMovies && (
        <View style={styles.news}>
          <Title style={styles.newsTitle}>Nuevas películas</Title>
          <CarouselVertical data={newMovies} navigation={navigation} />
        </View>
      )}

      <View style={styles.genres}>
        <Title style={styles.genresTitle}>Películas por genero</Title>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.genreList}>
          {map(genreList, genre => (
            <Text
              key={genre.id}
              style={[
                styles.genre,
                {color: genre.id !== genreSelected ? '#8697a5' : '#FFA833'},
              ]}
              onPress={() => onChangeGenre(genre.id)}>
              {genre.name}
            </Text>
          ))}
        </ScrollView>

        {genreMovies && (
          <CarouselMulti data={genreMovies} navigation={navigation} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  news: {
    marginVertical: 10,
  },
  newsTitle: {
    marginBottom: 15,
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },
  genres: {
    marginTop: 20,
    marginBottom: 50,
  },
  genresTitle: {
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },
  genreList: {
    marginTop: 2,
    marginBottom: 15,
    paddingHorizontal: 20,
    padding: 10,
  },
  genre: {
    marginRight: 20,
    fontSize: 16,
  },
});

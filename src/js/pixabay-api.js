//import response from '../testdata/cats.json';
//import empty from '../testdata/empty.json';
import { getApiKey } from './crypto';

export function getImages(searchTerm) {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  };
  const apiParams = new URLSearchParams({
    key: getApiKey(),
    //q: encodeURIComponent(searchTerm), // працює і без того
    q: searchTerm,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  const queryUrl = `https://pixabay.com/api/?${apiParams}`;
  //console.log(queryUrl);
  return fetch(queryUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => console.log('Error fetching photos:', error));
}

export function getImagesTest(searchTerm) {
  return fakeFetch(searchTerm)
    .then(searchTerm => {
      console.log(searchTerm, 'in getImagesTest');
      if (searchTerm === 'test') {
        return empty;
      } else {
        return response;
      }
    })
    .catch(error => {
      console.error(error);
      return empty;
    });
}

const fakeFetch = searchTerm => {
  return new Promise((resolve, reject) => {
    const timeout = Math.round(Math.random() * 2000);
    console.log(
      `emulate fetch search result with timeout: ${timeout} for search term: ${searchTerm}`
    );
    setTimeout(() => {
      if (!(searchTerm === 'error')) {
        resolve(searchTerm);
      } else {
        reject('http error in reject');
      }
    }, timeout);
  });
};

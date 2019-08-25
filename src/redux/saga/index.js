import { all, takeLatest } from 'redux-saga/effects';

import { FETCH_POKEMON, FETCH_SINGLE_POKEMON } from '../type/type.poke';

import { sagaFetchPokemons, sagaFetchSinglePokemon } from './saga.poke';

export default function* IndexSaga() {
  yield all([takeLatest(FETCH_POKEMON, sagaFetchPokemons)]);
  yield all([takeLatest(FETCH_SINGLE_POKEMON, sagaFetchSinglePokemon)]);
}

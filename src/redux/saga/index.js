import { all, takeLatest } from 'redux-saga/effects';

import { FETCH_POKEMON, FETCH_SINGLE_POKEMON } from '../type/type.poke';

import { fetchPokemons, fetchSinglePokemon } from './api/api.poke';

export default function* IndexSaga() {
  yield all([takeLatest(FETCH_POKEMON, fetchPokemons)]);
  yield all([takeLatest(FETCH_SINGLE_POKEMON, fetchSinglePokemon)]);
}

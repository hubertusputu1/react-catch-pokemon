import { put, call } from 'redux-saga/effects';

import {
  FETCH_POKEMON_FAILED,
  FETCH_POKEMON_SUCCESS,
  FETCH_SINGLE_POKEMON_FAILED,
  FETCH_SINGLE_POKEMON_SUCCESS,
} from '../type/type.poke';

import { fetchPokemons, fetchSinglePokemon } from './api/api.poke';

export function* sagaFetchPokemons(action) {
  try {
    const apiResult = yield call(fetchPokemons, action.payload);
    yield put({
      type: FETCH_POKEMON_SUCCESS,
      payload: {
        pokemons: apiResult.results,
        nextUrl: apiResult.next,
        prevUrl: apiResult.previous,
        total: apiResult.count,
        url: action.payload.url,
      },
    });
  } catch (error) {
    yield put({
      type: FETCH_POKEMON_FAILED,
      payload: {},
    });
  }
}

export function* sagaFetchSinglePokemon(action) {
  try {
    const pokemon = yield call(fetchSinglePokemon, action.payload);
    yield put({
      type: FETCH_SINGLE_POKEMON_SUCCESS,
      payload: { selectedPokemon: pokemon },
    });
  } catch (error) {
    yield put({
      type: FETCH_SINGLE_POKEMON_FAILED,
      payload: {},
    });
  }
}

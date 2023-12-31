
import DbOperations from './DbOperations'

import { getFiltersList } from '../modules/helpers'
import { isMatchFilter } from '../modules/helpers'

function getStoreTemplate(collectionTitle) {
	const collectionDB = new DbOperations(collectionTitle)
	return {
		namespaced: true,

		state: () => ({
			[collectionTitle]: [],
			loading: false,
			error: null,
			filter: {},
			coinsFilter: {
				name: '',
				category: [],
				priceFrom: null,
				priceTo: null,
			},
			filterGamesCategory: [],
			errorMessage: null,
		}),

		getters: {
			isLoading: state => state.loading,
			hasError: state => state.error,

			getItemsList: (state) => state[collectionTitle],
			getCategoriesList: (state) => getFiltersList(state[collectionTitle], "category"),
			coinsCategoriesList: (state) => getFiltersList(state[collectionTitle], 'category'),
			getItemById: (state) => (itemId) => state[collectionTitle].find((item) => item.id == itemId),
			getFilteredGamesList: (state, getters, rootState) => {
				const filteredGames = state[collectionTitle].filter((game) => {
					return isMatchFilter(game, state.filter);
				});

				if (!filteredGames.length) {
					rootState.errorMessage = "There are no games with such parameters";
				} else {
					rootState.errorMessage = null;
				}

				return filteredGames;
			},
			getFilteredCoinsList: state => {
				let filteredCoinsList = state['coins']
				filteredCoinsList = state['coins'].filter(coin => {
					const nameMatch = !state.coinsFilter.name || coin.name.toLowerCase().includes(state.coinsFilter.name.toLowerCase())
					const categoryMatch = state.coinsFilter.category.length === 0 || state.coinsFilter.category.includes(coin.category)
					const priceMatch = (!state.coinsFilter.priceFrom || coin.price >= state.coinsFilter.priceFrom) &&
						(!state.coinsFilter.priceTo || coin.price <= state.coinsFilter.priceTo)

					return nameMatch && categoryMatch && priceMatch
				})
				if (!filteredCoinsList.length) {
					state.errorMessage = "There are no products with such parameters"
				} else {
					state.errorMessage = null
				}
				return filteredCoinsList

			},
			filterGamesCategory: (state) => state.filterGamesCategory
		},

		mutations: {
			setItemsList(state, itemsList) {
				state[collectionTitle] = itemsList
			},
			deleteItem(state, deleteItemId) {
				state[collectionTitle] = state[collectionTitle].filter((item) => item.id !== deleteItemId)
			},
			setLoading(state, value) {
				state.loading = value
			},
			setError(state, error) {
				state.error = error
			},
			setFilter(state, filterData) {
				if (collectionTitle === 'games') {
					state.filter = { ...state.filter, ...filterData }
				} else if (collectionTitle === 'coins') {
					state.coinsFilter = { ...state.coinsFilter, ...filterData }
				}
			},
			getFilteredGamesListByCategory(state, tabItem) {
				if (tabItem) {
					if (tabItem === "All") {
						return state.filterGamesCategory = state[collectionTitle]
					} else {
						state.filterGamesCategory = state[collectionTitle].filter((game) => {
							return game.category === tabItem
						});
					}
				} else return state.filterGamesCategory
			},
		},

		actions: {
			loadList({ commit }) {
				commit('setError', null)
				commit('setLoading', true)
				collectionDB
					.loadItemsList()
					.then((list) => {
						commit('setItemsList', list)
					})
					.catch((error) => {
						commit('setError', error)
					})
					.finally(() => {
						commit('setLoading', false)
					})
			},
			addItem({ commit, dispatch }, item) {
				commit('setError', null)
				commit('setLoading', true)
				collectionDB
					.addItem(item)
					.then(() => {
						dispatch('loadList')
					})
					.catch((error) => {
						commit('setError', error)
					})
					.finally(() => {
						commit('setLoading', false)
					})
			},
			deleteItem({ commit, dispatch }, itemId) {
				commit('setError', null)
				commit('setLoading', true)

				collectionDB
					.deleteItem(itemId)
					.then(() => {
						dispatch('loadList').then(() => {
							commit('deleteItem', itemId);
						});
					})
					.catch((error) => {
						commit('setError', error)
					})
					.finally(() => {
						commit('setLoading', false)
					})
			},
			updateItem({ commit, dispatch }, { itemId, data }) {
				commit('setError', null)
				commit('setLoading', true)

				collectionDB
					.updateItem(itemId, data)
					.then(() => {
						dispatch('loadList')
					})
					.catch((error) => {
						commit('setError', error)
					})
					.finally(() => {
						commit('setLoading', false)
					})
			},
			updateFilter({ commit }, filterData) {
				commit('setFilter', filterData)
			},
			getFilteredGamesListByCategory({ commit }, tabItem) {
				commit("getFilteredGamesListByCategory", tabItem)
			},
		},
	}
}

export default getStoreTemplate


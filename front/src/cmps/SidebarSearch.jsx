import { useState, useCallback } from 'react'
import { userService } from '../services/user.service.js'
import { UserInfoCard } from './UserInfoCard'
import { debounce } from '../services/util.service.js'

export function SidebarSearch() {
  const [searchState, setSearchState] = useState({
    pattern: "",
    results: [],
    isLoading: false
  })

  const handleSearch = useCallback(debounce(async (value) => {
    try {
      if (value.trim()) {
        const filterBy = { txt: value }
        const result = await userService.query(filterBy)
        setSearchState(prev => ({ ...prev, results: result, isLoading: false }))
      } else {
        setSearchState(prev => ({ ...prev, results: [], isLoading: false }))
      }
    } catch (err) {
      console.log(err)
      setSearchState(prev => ({ ...prev, isLoading: false }))
    }
  }, 300), [])

  const handleInputChange = (event) => {
    const value = event.target.value
    setSearchState(prev => ({ ...prev, pattern: value, isLoading: true }))
    if (!value.trim()) {
      setSearchState(prev => ({ ...prev, results: [], isLoading: false }))
    } else {
      handleSearch(value)
    }
  }

  const handleClear = () => {
    setSearchState({ pattern: "", results: [], isLoading: false })
  }

  return (
    <div className="sidebar-search">
      <div className='search-header'>
        <div className="search-title"> Search </div>
        <div className="search-input-container">
          <input type="text" className='search-input'
            placeholder="Search"
            value={searchState.pattern}
            onChange={handleInputChange}
          />
          <button className="clear-button"
            onClick={handleClear}
            aria-label="Clear search"
          >
            ×
          </button>
        </div>
        <hr className="horizontal-line"/>
      </div>

      <div className="search-results">
        {searchState.isLoading && <div className='search-loading'>Searching...</div>}
        {!searchState.isLoading && searchState.pattern.trim() === '' && (
          <div className="search-recent">Recent</div>
        )}
        {!searchState.isLoading && searchState.pattern.trim() !== '' && searchState.results.length === 0 && (
          <div className="search-no-result">No Results Found</div>
        )}
        {!searchState.isLoading && searchState.results.length > 0 && (
          searchState.results.map((user) => (
            <div key={user._id} className="user-info-card-container">
              <UserInfoCard user={user} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

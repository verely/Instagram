import { useState } from 'react'
import { userService } from '../services/user.service.js'

export function SidebarSearch() {

  const [searchPattern, setSearchPattern] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = async (event) => {
    const value = event.target.value
    setSearchPattern(value)
    const filterBy = {txt: value}
    const result = await userService.query(filterBy)
    console.log(result)
    setSearchResults(result)
  }

    return (
      <div className="sidebar-search">
        <div className='search-header'>
          <div className="search-title"> Search </div>
          <input type="text"
            placeholder="Search"
            value={searchPattern}
            onChange={handleSearch}
          />
          <hr className="horizontal-line"/>
        </div>

        <div className="search-results">
          {searchResults.map((result, index) => (
            <div key={index}>

            </div>
          ))}
        </div>
      </div>
    )
  }

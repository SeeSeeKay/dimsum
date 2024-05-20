import 
  //React, 
  {useState} from 'react';
import { IoSearch } from 'react-icons/io5';
import PropTypes from 'prop-types'; // Import PropTypes

export default function Search({ setSearchTerm, setOtherTerm }) {
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [bedroomNumber, setBedroomNumber] = useState('');
  const [listingType, setListingType] = useState('');
  const [category, setCategory] = useState('');
  const [furnished, setFurnished] = useState('');
  const [parking, setParking] = useState('');
  const [addFilter, setAddFilter] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(search);
    setOtherTerm({
      minPrice,
      maxPrice,
      bedroomNumber,
      listingType,
      category,
      furnished,
      parking
    });
    // setSearchTerm({
    //   search,
    //   minPrice,
    //   maxPrice,
    //   bedroomNumber,
    //   listingType,
    //   category,
    //   furnished,
    //   parking
    // }); 
    // Call setSearchTerm with the current search value
  }

  const toggleFilter = () => {
    setAddFilter(!addFilter);
  }

  return (
    <form onSubmit={handleSearch}>
      <div className='relative flex'>
        <input
          type='text'
          className='block p-4 w-full text-lg text-gray-900 bg-white rounded-lg border-none focus-visible:border-none shadow-sm'
          placeholder='Search By Title/Description'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          // required=''
        />
        <button
          type='submit'
        >
          <div className='flex absolute right-4 top-4 items-center pl-5'>
            <span className="text-4xl">
              <IoSearch />
            </span>
          </div>
        </button>
      </div>
      <button onClick={toggleFilter}>{addFilter ? "Close Filter" : "Add Filter"}</button>
      {
        addFilter ? 
        <div>
            <div className='grid grid-cols-2 gap-4'>
            <div>
              <label>
                Price :
              </label>
              <div className='flex space-x-4'>
                <input type='number' className='block w-full p-2 text-lg text-gray-900 bg-white rounded-lg border-none shadow-sm' placeholder='Enter min price' min={1} value={minPrice} onChange={(e) => setMinPrice(e.target.value)}/> 
                <input type='number' className='block w-full p-2 text-lg text-gray-900 bg-white rounded-lg border-none shadow-sm' placeholder='Enter max price' min={1} value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}/> 
              </div>
            </div>
          </div>
          <div>
            <label>
              Bedrooms:
              <input
                type="number"
                className="block w-full p-2 text-lg text-gray-900 bg-white rounded-lg border-none shadow-sm"
                value={bedroomNumber}
                min={0}
                onChange={(e) => setBedroomNumber(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Listing Type:
              <select
                className="block w-full p-2 text-lg text-gray-900 bg-white rounded-lg border-none shadow-sm"
                value={listingType}
                onChange={(e) => setListingType(e.target.value)}
              >
                <option value="">Select</option>
                <option value="apartments">Apartments</option>
                <option value="houses">House</option>
                <option value="offices">Offices</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Category:
              <select
                className="block w-full p-2 text-lg text-gray-900 bg-white rounded-lg border-none shadow-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select</option>
                <option value="sale">Sale</option>
                <option value="rent">Rent</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Furnished:
              <select
                className="block w-full p-2 text-lg text-gray-900 bg-white rounded-lg border-none shadow-sm"
                value={furnished}
                onChange={(e) => setFurnished(e.target.value)}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Parking:
              <select
                className="block w-full p-2 text-lg text-gray-900 bg-white rounded-lg border-none shadow-sm"
                value={parking}
                onChange={(e) => setParking(e.target.value)}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>
          </div>
        </div> : ""
      }
    </form>
  )
}


// Define propsTable for your component
Search.propTypes = {
  setSearchTerm: PropTypes.func.isRequired,
};

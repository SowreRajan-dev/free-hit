import React, { useState, useEffect } from 'react'
import Header from './components/header'
import Card from './components/card'
import Footer from './components/footer'
import products from './DB/product.json'
import BackToTopButton from './components/BackToTop'

function App() {
  const [category, setCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [productNames, setProductNames] = useState(
    products?.map((product) => product.productName) || []
  )
  const [filteredSuggestions, setFilteredSuggestions] = useState([])

  function filterProduct(value) {
    setCategory(value)
    filteredButtonSelected(value)
  }

  async function filteredButtonSelected(value) {
    const button = document.querySelectorAll('.category-select')
    // Remove the "background-button-selected" class everytime the button is clicked at start to clear old selection
    button.forEach((i) => {
      i.classList.remove('background-button-selected')
    })
    let cnt = -1
    // Add the "background-button-selected" class to individual the button when it is clicked
    button.forEach((i) => {
      let selected = ''
      selected = i.getAttribute('productcategory')
      cnt++
      if (value === selected) {
        button[cnt].classList.add('background-button-selected')
        return
      }
    })
  }

  useEffect(() => {
    // Checks if the search term have a word
    if (searchTerm.length > 1) {
      // This filters out the names that starts with the given search term.
      const filterNames = productNames.filter((productName) =>
        productName.toLowerCase().startsWith(searchTerm.toLowerCase())
      )

      // the array containing the filtered words gets sorted.
      const sortedProductNames = filterNames.sort()
      setFilteredSuggestions(sortedProductNames)
    } else {
      setFilteredSuggestions([])
    }
  }, [searchTerm, productNames])

  useEffect(() => {
    setCategory('all')
  }, [])

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
  }
  const filteredProducts = products
    .filter((product) => {
      if (!searchTerm) return true
      const regex = new RegExp(escapeRegExp(searchTerm.trim()), 'gi')
      return (
        product.productName.match(regex) ||
        product.description.match(regex) ||
        product.category.match(regex)
      )
    })
    .sort((a, b) => {
      const nameA = a.productName.toUpperCase()
      const nameB = b.productName.toUpperCase()
      return nameA < nameB ? -1 : 1
    })

  return (
    <>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredSuggestions={filteredSuggestions}
      />
      <Card
        filterProduct={filterProduct}
        filteredProducts={filteredProducts}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        category={category}
        length={filteredProducts.length}
      />
      <Footer />
      <BackToTopButton />
    </>
  )
}

export default App


import { useState, useEffect } from 'react'
import { ExploreGridItem } from '../cmps/ExploreGridItem'
import { useIntersectionObserver } from '../hook/useIntersectionObserver'

export function ExplorePage() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  const [observerRef, isIntersecting] = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  })

  const fetchImages = async (pageToFetch) => {
    setLoading(true)
    try {
        console.log('page', pageToFetch)
        const flowerImages = [
          '1.jpg', '2.jpg', '3.jpg', 'nuriot2.jpg', '4.jpg',
          'green_flowers.jpeg', 'in_store.jpeg', 'sahlav.jpeg',
          'white_flowers.jpeg', 'bouquet1.jpeg'
        ]

        const imagesPerPage = 5
        const startIndex = (pageToFetch - 1) * imagesPerPage
        const endIndex = startIndex + imagesPerPage

        const data = flowerImages.slice(startIndex, endIndex).map((image, index) => ({
          url: `/public/media_samples/img_flowers/${image}`,
          id: `${pageToFetch}-${index}`,
        }))

        setImages(prevImages => [...prevImages, ...data])
    } catch (error) {
        console.error('Error fetching images:', error)
    } finally {
        setLoading(false)
    }
  }

  useEffect(() => {
    if (isIntersecting && !loading) {
      setPage(prevPage => prevPage + 1)
    }
  }, [isIntersecting, loading])

  useEffect(() => {
    fetchImages(page)
  }, [page])


  return (
    <div className="explore-page-container">
      {images.map((image, index) => (
        <ExploreGridItem
          key={index}
          image={image.url}
        />
      ))}
      {loading && <div className="loading-indicator">Loading more images...</div>}
      <div ref={observerRef}></div>
    </div>
  )
}

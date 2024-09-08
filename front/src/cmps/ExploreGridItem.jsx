export function ExploreGridItem({ image, spanRows }) {
    console.log('image: ', image)
    return (
      <div className={`explore-grid-item ${spanRows ? 'explore-grid-item--span-2' : ''}`}>
        <img src={image} alt="Grid Item" />
      </div>
    )
  }

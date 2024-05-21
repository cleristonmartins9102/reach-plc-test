import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { ImagesDataModel } from './data/model/images-data-model'
import { SimpleArrow } from "./components/icons/simple_arrow"
import { Header } from "./components/header/header"
import { Footer } from './components/footer/footer'
import { AxiosAdapter } from './infra/adapter/axios-adapter'

const App = () => {
  const [imagesList, setImageList] = useState<ImagesDataModel[]>([])
  const [countMovedSlides, setCountMovedSlides] = useState<number>(1)

  useEffect(() => {
    const httpRequest = new AxiosAdapter()
    httpRequest.request<ImagesDataModel[]>({ method: AxiosAdapter.Method.get, url: 'https://content.inyourarea.co.uk/ext/search?type=technicalTaskCarouselItem&env=dev' }).then((response: ImagesDataModel[]) => {
      const revertedImagesSequence = []
      for (let count = response.length - 1; count >= 0; count--) {
        revertedImagesSequence.push(response[count])
      }
      setImageList(revertedImagesSequence)
    })
  }, [])

  const righArrowClickFunction = useCallback((): void => {
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const track = document.querySelector('.tracking') as any
    if (track) {
      const currentSlide = track!.querySelector('.currentSlide')
      const rightSibling = currentSlide.nextElementSibling;
      if (!rightSibling) return
      track.style.transform = `translateX(-${parseInt(rightSibling.style.left.replace('px'))}px)`
      currentSlide.classList.remove('currentSlide')
      rightSibling.classList.add('currentSlide')
      setCountMovedSlides(prev => prev + 1)

    }
  }, [countMovedSlides])

  const leftArrowClickFunction = useCallback((): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const track = document.querySelector('.tracking') as any
    if (track) {
      const currentSlide = track!.querySelector('.currentSlide')
      const leftSibling = currentSlide.previousElementSibling;
      if (!leftSibling) return
      track.style.transform = `translateX(-${parseInt(leftSibling.style.left.replace('px'))}px)`
      currentSlide.classList.remove('currentSlide')
      leftSibling.classList.add('currentSlide')
      setCountMovedSlides(prev => prev - 1)
    }
  }, [countMovedSlides])

  return (
    <div className='carousel'>
      <Header leftArrowClick={leftArrowClickFunction} rightArrowClick={righArrowClickFunction}/>
      <div className="tracking">
        <ul>
          {
            imagesList.map((imageData, idx) =>
              <li key={idx} style={{'left': `${240 * idx + (idx === 0 ? 0 : 10 * idx)}px`}} className={`slide ${idx === 0 ? 'currentSlide' : ''}`}>
                <img src={imageData.image.url} alt="" />
                <div className="wrap_img_details">
                  <div className='title'>
                    {imageData.title}
                  </div>
                  <button className='read_more'>Read more <SimpleArrow/></button>
                </div>
              </li>
            )
          }
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default App

import { ArrowLeftLong } from "../icons/arrow-left-long/arrow-left-long"
import { ArrowRightLong } from "../icons/arrow-right-long/arrow-right-long"
import './header.css'

export const Header = (parameter: Header.Parameters) => {
  return (
    <div className="header">
    <div className='wrap_header_title'>
      <p>Car costs rising?</p>
      <span>Find out how could you save...</span>
    </div>
    <div className="wrap_arrows">
      <ArrowLeftLong onClick={parameter.leftArrowClick}/>
      <ArrowRightLong onClick={parameter.rightArrowClick}/>
    </div>
    </div>
  )
}

export namespace Header {
  export type Parameters = {
    rightArrowClick: () => void
    leftArrowClick: () => void
  }
}
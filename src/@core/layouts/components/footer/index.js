// ** Icons Import
import { Heart } from 'react-feather'
import markerSDK from '@marker.io/browser'

const Footer = () => {

  markerSDK.loadWidget({
    destination: '6266ca071e1f6f52f3baa1bd'
  })
  
    return (
    <p className='clearfix mb-0'>
      <span className='float-md-start d-block d-md-inline-block mt-25'>
        COPYRIGHT © {new Date().getFullYear()}{' '}
        <a href='https://www.fundyouthsports.com/' target='_blank' rel='noopener noreferrer'>
          Fund Youth Sports
        </a>
        <span className='d-none d-sm-inline-block'>, All rights Reserved</span>
      </span>
      <span className='float-md-end d-none d-md-block'>
        Hand-crafted & Made with
        <Heart size={14} /> by <a href="https://www.devnostic.com/">DEVNOSTIC</a>
      </span>
    </p>
  )
}

export default Footer

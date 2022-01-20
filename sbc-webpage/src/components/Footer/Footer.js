import './Footer.css'
import {FiInstagram} from 'react-icons/fi'
import {AiOutlineYoutube} from 'react-icons/ai'
import {AiFillFacebook} from 'react-icons/ai'
import {CgMail} from 'react-icons/cg'

const Footer = () => {
    return(
        <div className='footerDiv'>
            <h5 className='footerllc'> Shida's Broom Closet LLC </h5> 
            <h1> <a href="https://www.facebook.com/Shidasbroomcloset"><AiFillFacebook/></a> <a href="https://www.instagram.com/shida.styles/?hl=en"><FiInstagram/></a> <a href="https://www.youtube.com/channel/UCar096YR4uGw4Dmi5GqIEiQ"><AiOutlineYoutube/></a> <CgMail/>  </h1>
        </div>
    )
}

export default Footer
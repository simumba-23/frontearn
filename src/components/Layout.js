import React from 'react'; 
// import NavBar from './NavBar';
import {Helmet} from "react-helmet";

const Layout = ({title, content,children}) => {
    return(

        <>
        {/* <NavBar /> */}
    
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={content}/>
        </Helmet>
        <div className='container '>{children}</div>
        </>
    )
  
}

export default Layout
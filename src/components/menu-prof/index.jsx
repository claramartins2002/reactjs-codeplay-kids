import React, { useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {
  MDBNavbar,
  MDBNavbarToggler,
  MDBIcon,
  MDBCollapse
} from 'mdb-react-ui-kit';

const NavbarProf =() => {
  const [openNavExternal2, setOpenNavExternal2] = useState(false);

  return (<div>
      <MDBCollapse open={openNavExternal2}>
        <div className='bg-dark p-4'>
          <h5 className='text-white h4'>Collapsed content</h5>
          <span className='text-muted'>Toggleable via the navbar brand.</span>
        </div>
      </MDBCollapse>
      <MDBNavbar dark bgColor='dark'>
          <MDBNavbarToggler
            type='button'
            ata-target='#navbarToggleExternalContent'
            data-mdb-toggle="collapse"
            aria-controls='navbarToggleExternalContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setOpenNavExternal2(!openNavExternal2)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
      </MDBNavbar>
      </div>

  );
}

export default NavbarProf;
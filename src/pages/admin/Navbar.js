import React, { useState } from 'react';

const Navbar = () => {
  const [collapse2, setCollapse2] = useState(false);

  const bgBlack = { backgroundColor: '#000000', color: '#f4f4f4' };

  return (
    <div>
      <nav
        class="navbar navbar-expand-md navbar-dark bg-dark "
        style={{ position: 'static' }}
      >
        <h4
          class="navbar-brand text-decoration-none text-white text-center"
          style={{ padding: '15px' }}
        >
          SLIIT Research Management Tool
        </h4>
      </nav>
    </div>
  );
};
export default Navbar;

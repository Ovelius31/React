import React from 'react';

function Header() {
  return (
    <div className="flex items-center flex-shrink-0 h-16 px-8 border-b border-gray-300">
      <a href='.'>
        <img
          className="w-auto h-12"
          src="/img/cropped-LOGO-SBA.png"
          style={{ marginRight: '8px' }}
          alt="cropped-LOGO-SBA"
        />
      </a>
      <h1 className="text-lg font-medium">IT Management Asset</h1>
      <div className="ml-auto flex items-center relative">
        
      </div>
    </div>
  );
}

export default Header;

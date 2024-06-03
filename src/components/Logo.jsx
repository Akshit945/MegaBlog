import React from 'react';

function Logo({ width = '100px' }) {
  return (
    <div>
      <img 
        className="rounded-full" 
        src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png" 
        alt="Blog Logo" 
        width={width} 
      />
    </div>
  );
}

export default Logo;

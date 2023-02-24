import React from 'react';

function Home() {
  const [searchValue, setSearchValue] = React.useState<string>('');
  return (
    <div>
      <input value={searchValue} />
    </div>
  );
}

export default Home;

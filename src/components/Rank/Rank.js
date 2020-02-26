import React from 'react';

const Rank = ({name, entries}) => {
  return (
      <div className="center tc">
        <p className="f2 mt1-ns">{`${name}, You tried image detection ${entries} times`}</p>
      </div>
  );
};

export default Rank;
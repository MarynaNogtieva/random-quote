import React from 'react';

const Quote = (props) => {
  return(
    <div>
      <div className='quote-text'>
        <div id='text' className='quote-text__quote'>{props.quote.quote}</div>
        <div id='author' className='quote-text__author'>-{props.quote.author}</div>
      </div>
    </div>
  );
}

export default Quote;
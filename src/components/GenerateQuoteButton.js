import React from 'react';
import TwitButton from './TwitButton'


const GenerateQuoteButton = (props) => {
  return (
    <div>
      <div className='button-container'>
        <button id='new-quote'
          onClick={props.onNewQuote}
          disabled={!props.hasQuotes}
          className='button-container__new-quote'
        >
          New Quote
        </button>
        <TwitButton quote={ props.quote } author={ props.author } />
      </div>
    </div>
  )
}

export default GenerateQuoteButton;
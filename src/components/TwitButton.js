import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas, faTwitter);


const TwitButton = (props) => {
  let tweetURL = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent('"' + props.quote + '" -' + props.author)}`;
  return (
    <div>
     <a href={tweetURL}
        id='tweet-quote'
        className='button-container__twit'
        title='Tweet'
        target='_blank'>
          <FontAwesomeIcon
            icon={faTwitter}
          />
      </a>
    </div>
  );
}

export default TwitButton;
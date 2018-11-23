console.log('hi from react');

let appRoot = document.getElementById('app');

const colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', '#472E32', '#BDBB99', '#77B1A9', '#73A857'];

const quotes = [
  {
  quote: 'Life isn’t about getting and having, it’s about giving and being.',
  author: 'Kevin Kruse'
  },
  {
  quote: 'Whatever the mind of man can conceive and believe, it can achieve.',
  author: 'Napoleon Hill'
  },
  {
  quote: 'Strive not to be a success, but rather to be of value.',
  author: 'Albert Einstein'
  },
  {
  quote: 'Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.',
  author: 'Robert Frost'
  },
  {
  quote: 'I attribute my success to this: I never gave or took any excuse.',
  author: 'Florence Nightingale'
  }
];






let defaultQuote = quotes[0];

const onNewQuote = () => {
  const randomNum = Math.floor(Math.random() * quotes.length);
  defaultQuote = quotes[randomNum];
  renderQuoteApp();
};

const generateColor = () => {
  let randomColor = Math.floor( Math.random() * colors.length );

  return { color: colors[randomColor] } ;
};

const onQuoteAdd = (e) => {
  e.preventDefault();

  let quote = e.target.elements.quote.value;
  let author = e.target.elements.author.value;

  if(quote && author) {
    quotes.push({quote: quote, author: author});


    console.log(quote, author);
    e.target.elements.quote.value = '';
    e.target.elements.author.value = '';
  }
  renderQuoteApp();
}

const renderQuoteApp = () => {
  let styleobject = generateColor();
  const template = (
    <div id='quote-box'>
      <p>{quotes.length}</p>
      {
        quotes.map((obj, index) => {
          return <div key={index}>
                  <p>{obj.quote}</p>
                  <p>{obj.author}</p>
                </div>;
        })
      }
      <div id='text' style={ Object.assign({}, styleobject ) }>{defaultQuote.quote}</div>
      <div id='author' style={ Object.assign({}, styleobject) }>{defaultQuote.author}</div>
      <div className='buttons'>
      <button id='new-quote' onClick={onNewQuote}style={ { background: styleobject.color } }>New Quote</button>
      </div>

      <form onSubmit={onQuoteAdd}>
        <input type="text" name="quote" placeholder="Enter quote..."></input>
        <input type="text" name="author" placeholder="Enter author's name..."></input>
        <button>Add Quote</button>
      </form>
    </div>
  );

  ReactDOM.render(template, appRoot);
}

renderQuoteApp();

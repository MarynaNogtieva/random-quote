class RandomQuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteQuote = this.handleDeleteQuote.bind(this);
    this.handleAddQuote = this.handleAddQuote.bind(this);
    this.onNewQuote = this.onNewQuote.bind(this)
    this.state = {
      quotes: props.quotes
    };
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('quotes');
      const parsedQuotes = JSON.parse(json);
      if(parsedQuotes) {
        this.setState(() => ({quotes: JSON.parse(json)}));
      }
    } catch (e) {
      // nothing at all
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.quotes.length !== this.state.quotes.length) {
      const json = JSON.stringify(this.state.quotes);
      localStorage.setItem('quotes', json);
      console.log('saving data');
    }
  }

  handleDeleteQuote(quoteObj) {
    console.log('hdq', quoteObj);
    this.setState((prevState) => {
      return { quotes: prevState.quotes.filter((option) => {
          return option.quote !== quoteObj.quote && option.author !== quoteObj.author;
        })
      }
    })
  }

  handleAddQuote(quote, author) {
    if(!quote || !author){
      return 'Enter author and quote';
    }
    this.setState((prevState) => {
     return { quotes: prevState.quotes.concat(
          {
            quote: quote,
            author: author
          }
        )
      }
    })
  }

  onNewQuote() {
    const randomNum = Math.floor(Math.random() * this.state.quotes.length);
    let defaultQuote = this.state.quotes[randomNum];
    alert(defaultQuote.quote, defaultQuote.author);
  }
  render(){
    const mainTitle='Reandom Quote Machine!';
    const subTitle = 'Choose a quote you want to twit!'
    return (
      <div>
        <Header mainTitle={ mainTitle } subTitle={ subTitle }/>
        <DefaultQuote quotes={ this.state.quotes }/>
        <ChooseQuote hasQuotes={ this.state.quotes.length > 0 } quotes={ this.state.quotes } onNewQuote={this.onNewQuote}/>
        <AllQuotes  quotes={ this.state.quotes }
                    onNewQuote={this.onNewQuote}
                    handleDeleteQuote={this.handleDeleteQuote}
        />
        <AddQuote handleAddQuote={this.handleAddQuote} />
      </div>
    );
  }
}

RandomQuoteMachine.defaultProps = {
  quotes: [
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
  ]
}

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>{ this.props.mainTitle }</h1>
        <h2>{ this.props.subTitle }</h2>
      </div>
    )
  }
}

const ChooseQuote = (props) => {
  return (
    <div>
      <button
        onClick={props.onNewQuote}
        disabled={!props.hasQuotes}
      >
        New Quote
      </button>
    </div>
  );
}

class AddQuote extends React.Component {
  constructor(props){
    super(props);
    this.handleAddQuote = this.handleAddQuote.bind(this);

    this.state = {
      error: undefined
    }
  }
  handleAddQuote(e) {
    e.preventDefault();

    let quote = e.target.elements.quote.value;
    let author = e.target.elements.author.value;
    const error = this.props.handleAddQuote(quote, author);

    this.setState(() => {
      return {
        error: error
      }
    })

    if (!error){
      e.target.elements.quote.value = '';
      e.target.elements.author.value = '';
    }
  }
  render( ) {
    return(
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddQuote}>
          <input type="text" name="quote" placeholder="Enter quote..."></input>
          <input type="text" name="author" placeholder="Enter author's name..."></input>
          <button>Add Quote</button>
        </form>
      </div>
    );
  }
}

const DefaultQuote = (props) => {
  let defaultQuote = props.quotes[0];

  return(
    <div>
      <div>{defaultQuote.quote}</div>
      <div>{defaultQuote.author}</div>
    </div>
  );
}

const AllQuotes = (props) => {
  return (
    <div>
      {
        props.quotes.map((obj, index) => {
          return <Quote key={index}
                        quote={obj.quote}
                        author={obj.author}
                        quotes={props.quotes}
                        onNewQuote={props.onNewQuote}
                        handleDeleteQuote={props.handleDeleteQuote}
                  />
        })
      }
    </div>
  )
}
const Quote = (props) => {
  return (
    <div key={props.index} >
      <button
          onClick={(e) => {
            props.handleDeleteQuote({quote: props.quote, author: props.author})
          }}>
        Remove
      </button>
      <p>{props.quote}</p>
      <p>{props.author}</p>
      <ChooseQuote hasQuotes={ props.quotes.length > 0 }
                   quotes={props.quotes}
                   onNewQuote={props.onNewQuote}
      />
    </div>
  )
}

ReactDOM.render(<RandomQuoteMachine />, document.getElementById('app'));
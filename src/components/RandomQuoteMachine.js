import React from 'react';
import GenerateQuoteButton from './GenerateQuoteButton';
import Quote from './Quote';
import Header from './Header';


export default class RandomQuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.onNewQuote = this.onNewQuote.bind(this)
    this.handleGenerateRandomQuote = this.handleGenerateRandomQuote.bind(this);
    this.handleGenerateRandomNumber = this.handleGenerateRandomNumber.bind(this);
    this.state = {
      quotes: props.quotes,
      quote:{}
    };
  }

  componentDidMount() {
    try {
      this.handleGenerateRandomQuote();
    } catch (e) {
      // nothing at all
    }
  }

  onNewQuote() {
    const randomNum = this.handleGenerateRandomNumber();
    let newQuote = this.state.quotes[randomNum];
    this.setState(() => {
      return {
        quote: newQuote
      }
    })
  }

  handleGenerateRandomQuote () {
    const num = this.handleGenerateRandomNumber();
    this.setState((prevState) => {
      return {
        quote: prevState.quotes[num]
      }
    })
  }

  handleGenerateRandomNumber(){
    const num = Math.floor(Math.random() * this.state.quotes.length);
    return num;
  }

  render(){
    const mainTitle='Random Quote Machine!';
    const subTitle = 'Choose a quote you want to twit!'
    return (
      <div id='quote-box'>
        <Header mainTitle={ mainTitle } subTitle={ subTitle }/>
        <div className='quote-container'>
          <div className='quote-container__display'>
            <Quote
              quote={this.state.quote}
            />
            <GenerateQuoteButton hasQuotes={ this.state.quotes.length > 0 } quotes={ this.state.quotes } onNewQuote={this.onNewQuote} quote={ this.state.quote.quote } author={ this.state.quote.author }/>
          </div>
        </div>
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

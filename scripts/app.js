'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RandomQuoteMachine = function (_React$Component) {
  _inherits(RandomQuoteMachine, _React$Component);

  function RandomQuoteMachine(props) {
    _classCallCheck(this, RandomQuoteMachine);

    var _this = _possibleConstructorReturn(this, (RandomQuoteMachine.__proto__ || Object.getPrototypeOf(RandomQuoteMachine)).call(this, props));

    _this.handleDeleteQuote = _this.handleDeleteQuote.bind(_this);
    _this.handleAddQuote = _this.handleAddQuote.bind(_this);
    _this.onNewQuote = _this.onNewQuote.bind(_this);
    _this.state = {
      quotes: props.quotes
    };
    return _this;
  }

  _createClass(RandomQuoteMachine, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      try {
        var json = localStorage.getItem('quotes');
        var parsedQuotes = JSON.parse(json);
        if (parsedQuotes) {
          this.setState(function () {
            return { quotes: JSON.parse(json) };
          });
        }
      } catch (e) {
        // nothing at all
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.quotes.length !== this.state.quotes.length) {
        var json = JSON.stringify(this.state.quotes);
        localStorage.setItem('quotes', json);
        console.log('saving data');
      }
    }
  }, {
    key: 'handleDeleteQuote',
    value: function handleDeleteQuote(quoteObj) {
      console.log('hdq', quoteObj);
      this.setState(function (prevState) {
        return { quotes: prevState.quotes.filter(function (option) {
            return option.quote !== quoteObj.quote && option.author !== quoteObj.author;
          })
        };
      });
    }
  }, {
    key: 'handleAddQuote',
    value: function handleAddQuote(quote, author) {
      if (!quote || !author) {
        return 'Enter author and quote';
      }
      this.setState(function (prevState) {
        return { quotes: prevState.quotes.concat({
            quote: quote,
            author: author
          })
        };
      });
    }
  }, {
    key: 'onNewQuote',
    value: function onNewQuote() {
      var randomNum = Math.floor(Math.random() * this.state.quotes.length);
      var defaultQuote = this.state.quotes[randomNum];
      alert(defaultQuote.quote, defaultQuote.author);
    }
  }, {
    key: 'render',
    value: function render() {
      var mainTitle = 'Reandom Quote Machine!';
      var subTitle = 'Choose a quote you want to twit!';
      return React.createElement(
        'div',
        null,
        React.createElement(Header, { mainTitle: mainTitle, subTitle: subTitle }),
        React.createElement(DefaultQuote, { quotes: this.state.quotes }),
        React.createElement(ChooseQuote, { hasQuotes: this.state.quotes.length > 0, quotes: this.state.quotes, onNewQuote: this.onNewQuote }),
        React.createElement(AllQuotes, { quotes: this.state.quotes,
          onNewQuote: this.onNewQuote,
          handleDeleteQuote: this.handleDeleteQuote
        }),
        React.createElement(AddQuote, { handleAddQuote: this.handleAddQuote })
      );
    }
  }]);

  return RandomQuoteMachine;
}(React.Component);

RandomQuoteMachine.defaultProps = {
  quotes: [{
    quote: 'Life isn’t about getting and having, it’s about giving and being.',
    author: 'Kevin Kruse'
  }, {
    quote: 'Whatever the mind of man can conceive and believe, it can achieve.',
    author: 'Napoleon Hill'
  }, {
    quote: 'Strive not to be a success, but rather to be of value.',
    author: 'Albert Einstein'
  }, {
    quote: 'Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.',
    author: 'Robert Frost'
  }, {
    quote: 'I attribute my success to this: I never gave or took any excuse.',
    author: 'Florence Nightingale'
  }]
};

var Header = function (_React$Component2) {
  _inherits(Header, _React$Component2);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          this.props.mainTitle
        ),
        React.createElement(
          'h2',
          null,
          this.props.subTitle
        )
      );
    }
  }]);

  return Header;
}(React.Component);

var ChooseQuote = function ChooseQuote(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      {
        onClick: props.onNewQuote,
        disabled: !props.hasQuotes
      },
      'New Quote'
    )
  );
};

var AddQuote = function (_React$Component3) {
  _inherits(AddQuote, _React$Component3);

  function AddQuote(props) {
    _classCallCheck(this, AddQuote);

    var _this3 = _possibleConstructorReturn(this, (AddQuote.__proto__ || Object.getPrototypeOf(AddQuote)).call(this, props));

    _this3.handleAddQuote = _this3.handleAddQuote.bind(_this3);

    _this3.state = {
      error: undefined
    };
    return _this3;
  }

  _createClass(AddQuote, [{
    key: 'handleAddQuote',
    value: function handleAddQuote(e) {
      e.preventDefault();

      var quote = e.target.elements.quote.value;
      var author = e.target.elements.author.value;
      var error = this.props.handleAddQuote(quote, author);

      this.setState(function () {
        return {
          error: error
        };
      });

      if (!error) {
        e.target.elements.quote.value = '';
        e.target.elements.author.value = '';
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.state.error && React.createElement(
          'p',
          null,
          this.state.error
        ),
        React.createElement(
          'form',
          { onSubmit: this.handleAddQuote },
          React.createElement('input', { type: 'text', name: 'quote', placeholder: 'Enter quote...' }),
          React.createElement('input', { type: 'text', name: 'author', placeholder: 'Enter author\'s name...' }),
          React.createElement(
            'button',
            null,
            'Add Quote'
          )
        )
      );
    }
  }]);

  return AddQuote;
}(React.Component);

var DefaultQuote = function DefaultQuote(props) {
  var defaultQuote = props.quotes[0];

  return React.createElement(
    'div',
    null,
    React.createElement(
      'div',
      null,
      defaultQuote.quote
    ),
    React.createElement(
      'div',
      null,
      defaultQuote.author
    )
  );
};

var AllQuotes = function AllQuotes(props) {
  return React.createElement(
    'div',
    null,
    props.quotes.map(function (obj, index) {
      return React.createElement(Quote, { key: index,
        quote: obj.quote,
        author: obj.author,
        quotes: props.quotes,
        onNewQuote: props.onNewQuote,
        handleDeleteQuote: props.handleDeleteQuote
      });
    })
  );
};
var Quote = function Quote(props) {
  return React.createElement(
    'div',
    { key: props.index },
    React.createElement(
      'button',
      {
        onClick: function onClick(e) {
          props.handleDeleteQuote({ quote: props.quote, author: props.author });
        } },
      'Remove'
    ),
    React.createElement(
      'p',
      null,
      props.quote
    ),
    React.createElement(
      'p',
      null,
      props.author
    ),
    React.createElement(ChooseQuote, { hasQuotes: props.quotes.length > 0,
      quotes: props.quotes,
      onNewQuote: props.onNewQuote
    })
  );
};

ReactDOM.render(React.createElement(RandomQuoteMachine, null), document.getElementById('app'));

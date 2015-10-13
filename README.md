# react-codemod

Converts:

```
var Test = React.createClass({
  getInitialState: function() {
    return {
      test: false
    };
  },

  render: function() {
    return (
      <div className="details" style={{textAlign: 'center'}}>
        <div style={{fontSize: '15px'}}>
          {this.props.info}
        </div>
      </div>
    );
  },

  componentDidMount: function() {
  }
});
```

To:

```
class Test extends React {
  state = {
    test: false
  };

  render() {
    return (
      <div className="details" style={{textAlign: 'center'}}>
        <div style={{fontSize: '15px'}}>
          {this.props.info}
        </div>
      </div>
    );
  }

  componentDidMount() {
  }
}
```

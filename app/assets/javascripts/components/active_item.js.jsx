var ActiveItem = React.createClass ({

  render: function () {

    return (
      <div>
        <TodoDetailView todo={ this.props.todo } />
      </div>
    );
  }
});
        // <DoneButton todo={ this.props.todo }/>

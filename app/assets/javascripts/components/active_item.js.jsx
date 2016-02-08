var ActiveItem = React.createClass ({

  render: function () {

    return (
      <div>
        <div onClick={this.handleClick}>
        <TodoDetailView todo={this.props.todo} />
        </div>
        <DoneButton todo={this.props.todo}/>
      </div>
    );
  }
});

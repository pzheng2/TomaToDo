class Api::TodosController < ApplicationController

  def index
    todos = Todo.all
    render json: todos
  end

  def show
    @todo = Todo.find(params[:id])
    render json: @todo
  end

  def create
    tp = todo_params
    tp[:done] = false
    @todo = Todo.create!(tp)
    render json: @todo
  end

  def update
    @todo = Todo.find(params[:id])
    @todo.update_attributes(todo_params)
    render json: @todo
  end

  def destroy
    @todo = Todo.find(params[:id])
    @todo.destroy!
    render json: @todo
  end

  private

  def todo_params
    params.require(:todo).permit(:title, :body, :pomodoros, :done)
  end
end

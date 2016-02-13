class RemoveDoneFromTodos < ActiveRecord::Migration
  def change
    remove_column :todos, :done
  end
end

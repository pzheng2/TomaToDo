class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string :title, null: false, unique: true
      t.text :body
      t.integer :pomodoros
      t.boolean :complete

      t.timestamps
    end

    add_index :todos, :title
  end
end

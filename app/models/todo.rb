class Todo < ActiveRecord::Base
  validates :title, presence: true, uniqueness: true
  validates :done, inclusion: { in: [true, false] }
  validates :pomodoros, presence: true

end

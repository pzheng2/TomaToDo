class Todo < ActiveRecord::Base
  validates :title, presence: true
  validates :pomodoros, presence: true, :numericality => { :greater_than_or_equal_to => 0 }
  validates :user_id, presence: true
  belongs_to :user

end

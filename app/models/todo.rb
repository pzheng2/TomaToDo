class Todo < ActiveRecord::Base
  validates :title, presence: true
  validates :done, inclusion: { in: [true, false] }
  validates :pomodoros, presence: true, :numericality => { :greater_than_or_equal_to => 0 }
  validates :user_id, presence: true
  before_save :done?

  belongs_to :user

  def done?
    self.done = (self.pomodoros == 0) ? true : false;
    true
  end

end

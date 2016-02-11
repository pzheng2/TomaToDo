class Todo < ActiveRecord::Base
  validates :title, presence: true, uniqueness: true
  validates :done, inclusion: { in: [true, false] }
  validates :pomodoros, presence: true, :numericality => { :greater_than_or_equal_to => 0 }
  before_save :done?

  def done?
    self.done = (self.pomodoros == 0) ? true : false;
    true
  end

end

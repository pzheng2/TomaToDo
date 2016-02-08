class Todo < ActiveRecord::Base
  validates :title, presence: true, uniqueness: true
  validates :complete, presence: true, inclusion: { in: [true, false] }

end

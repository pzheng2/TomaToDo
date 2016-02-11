Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resource :session,    only: [:create, :destroy, :show]
    resources :users,     only: [:new, :create, :index, :show]
    resources :todos,     only: [:index, :show, :create, :destroy, :update]
  end
end

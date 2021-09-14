Rails.application.routes.draw do
  resources :comments, only: [:create]
  resources :confessions, only: [:index, :create, :show]
end
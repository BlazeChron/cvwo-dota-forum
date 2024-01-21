Rails.application.routes.draw do

  #Login
  get 'login', to: 'sessions#new'
  post 'login/new', to: 'sessions#create'
  get 'login/queryUser', to: 'sessions#queryUser'

  #Users
  get '/signup', to: 'users#index'
  post '/signup/new', to: 'users#create'
  get 'users/destroy'
  get 'users/show'

  #Posts
  get 'posts/index'


  #Comments
  get 'comments/index'
  get 'comments/new'
  get 'comments/create'
  get 'comments/show'
  get 'comments/destroy'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root 'posts#index'

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end

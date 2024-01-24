Rails.application.routes.draw do

  #Login
  get 'login', to: 'sessions#new'
  post 'login/new', to: 'sessions#create'
  get 'login/destroy', to: 'sessions#destroy'
  get 'login/queryUser', to: 'sessions#queryUser'

  #Users
  get '/signup', to: 'users#index'
  post '/signup/new', to: 'users#create'
  get 'users/destroy'
  get 'users/show'

  #Posts
  get 'posts/index'
  get 'posts/new'
  get 'posts/show', to: 'posts#show'
  get 'posts/show/:id', to: 'posts#show'
  get 'posts/show/data/:id', to: 'posts#showdata'
  post 'posts/create'
  post 'posts/search', to: 'posts#search'
  delete 'posts/delete/:id', to: 'posts#destroy'
  post 'posts/update/:id', to: 'posts#update'
  get 'posts/isOriginalPoster/:id', to: 'posts#isOriginalPoster'

  #Comments
  get 'comments/index'
  get 'comments/new'
  get "comments/:commentId", to: 'comments#index'
  post 'comments/create/:id', to: 'comments#create'
  get 'comments/show/:id', to: 'comments#show'
  delete 'comments/delete/:id', to: 'comments#destroy'
  get 'comments/isOriginalPoster/:id', to: 'comments#isOriginalPoster'
  post 'comments/edit/:id', to: 'comments#update'


  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root 'posts#index'

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end

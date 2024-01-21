class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by_username(params[:username])
    if user && user.authenticate(params[:password])
      puts "yasyas"
      puts user.id
      session[:user_id] = user.id
    else
      puts "invalidge"
    end
  end

  def queryUser
    @response = {
        user_id: session[:user_id]
      }
      render json: @response
  end
end

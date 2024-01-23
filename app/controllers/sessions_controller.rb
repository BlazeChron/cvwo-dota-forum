class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by_username(params[:username])
    if user && user.authenticate(params[:password])
      puts "yasyas"
      puts user.id
      session[:user_id] = user.id
      @response = {success: true}
      render json: @response
    else
      puts "invalidge"
      @response = {success: false, error: "Invalid username or password"}
      render json: @response
    end
  end

  def destroy
    puts "over"
    session[:user_id] = nil
  end

  def queryUser
    @response = {
        username: User.find_by_id(session[:user_id]).username
      }
      render json: @response
  end
end

class UsersController < ApplicationController
  def show
  end

  def index
  end

  def new
    @user = User.new
  end
  

  def create
    puts params
    @user = User.new(user_params)
    if @user.save
      puts "saved"
    else 
      puts "failed"
    end
  end

  def user_params
    params.require(:user).permit(:username, :password)
  end
end

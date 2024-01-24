class PostsController < ApplicationController
  before_action :set_post

  def index
  end

  def showdata
    puts "showing"
    puts json: @post
    render json: @post
  end
  
  def show
  end

  def search
    puts params
    #posts = Post.all.order(created_at: :desc)
    posts = Post.where('tags ILIKE ?', "%#{params[:tags].downcase}%").all
    puts json: posts
    render json: posts
  end

  def create
    @post = Post.new(post_params.merge(:original_poster => User.find(session[:user_id]).username))
    if @post.save
      puts "SUCCESS"
    else
      puts "FAILED"
    end
  end

  def destroy
    if (User.find(session[:user_id]).username === @post.original_poster)
      @post.destroy()
    end
  end

  def update
    if (User.find(session[:user_id]).username === @post.original_poster)
      @post.update(post_params)
    else
      puts "Not correct user"
    end
  end

  def isOriginalPoster
    if (User.find(session[:user_id]).username === @post.original_poster)
      @response = {success: true}
      render json: @response
    else
      @response = {success: false}
      render json: @response
    end
  end

  private
    def post_params
      puts params
      params.require(:post).permit(:title, :body, :tags)
    end

    def set_post
      if params[:id]
        @post = Post.find(params[:id])
      end
    end
end

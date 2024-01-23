class CommentsController < ApplicationController
  #before_action :set_comment
  def index
  end

  def new
  end

  def create
      puts "over"
      @post = Post.find(params[:id])
      @comment = @post.comments.create(comment_params.merge(:original_poster => User.find(session[:user_id]).username))

  end

  def show
      puts "receiving"
      if params[:id]
        puts "received"
        @post = Post.find(params[:id])
        render json: @post.comments
      else
        @response = {fail: true}
        render json: @response
      end
  end

  def destroy
    set_comment
    if (User.find(session[:user_id]).username === @comment.original_poster)
      @comment.destroy()
    end
  end
  
  def isOriginalPoster
    set_comment
    if (User.find(session[:user_id]).username === @comment.original_poster)
      @response = {success: true}
      render json: @response
    else
      @response = {success: false}
      render json: @response
    end
  end

  def update
    set_comment
    if (User.find(session[:user_id]).username === @comment.original_poster)
      @comment.update(comment_params)
    else
      puts "Not correct user"
    end
  end

  private
      def comment_params
          puts params
          params.require(:comment).permit(:body)
      end

      def set_comment
        if params[:id]
          @comment = Comment.find(params[:id])
        end
      end
end

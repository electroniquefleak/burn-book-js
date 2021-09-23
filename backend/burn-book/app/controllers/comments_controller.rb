class CommentsController < ApplicationController

    def create
        @comment = Comment.new(comment_params)
        @comment.confession_id = params[:confession_id]
        if @comment.save
            puts "Comment added!"
            render json: @confession
        else
            puts "Error: failed to create comment."
        end
    end

    private

    def comment_params
        params.require(:confession).permit(:body, :confession_id)
    end

end

class CommentsController < ApplicationController

    def create
        @comment = Comment.new(comment_params)
        if @comment.save
            puts "Comment added!"
            render json: @comment
        else
            puts "Error: failed to create comment."
        end
    end

    private

    def comment_params
        params.require(:comment).permit(:body, :confession_id)
    end

end

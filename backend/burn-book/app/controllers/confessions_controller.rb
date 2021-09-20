class ConfessionsController < ApplicationController
    def index
        @confessions = Confession.all
        render json: @confessions
    end

    def show
        @confession = Confession.find(params[:id])
        render json: @confession.as_json(include: :comments)
    end

    def create
        @confession = Confession.new(confession_params)
        if @confession.save
            puts "Confession created!"
            render json: @confession
        else
            puts "Error: failed to create confession."
        end
    end

    private

    def confession_params
        params.require(:confession).permit(:title, :body)
    end
end

class ConfessionsController < ApplicationController
    def index
        @confessions = Confession.all
        render json: @confessions
    end

    def show
        @confession = Confession.find(params[:id])
        render json: @confession.as_json(include: :comments)
    end
end

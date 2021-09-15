class ConfessionsController < ApplicationController
    def index
        @confessions = Confession.all
        render json: @confessions
    end
end

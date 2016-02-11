class Api::SessionsController < ApplicationController

  def show
    unless current_user
      render json: { username: "" }
      return
    end

    @user = current_user
    render json: @user
  end

  def create
    @user = User.find_by_credentials(
      params[:username],
      params[:password]
    )
    if @user.nil?
      render json: { errors: "Wrong credentials" }, status: 400
    else
      sign_in(@user)
      render json: @user
    end
  end

  def destroy
    sign_out
    render json: {}
  end


end

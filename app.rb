require "sinatra"
require "rubygems"
require "bundler/setup"
def startgame()
	@board=Array.new(6){Array.new(6)}
	@turn="white"
end
 get "/" do
 	startgame()
 	erb :index
 end
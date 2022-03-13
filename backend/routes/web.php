<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

// USER
$router->post('api/register', ['uses' => 'UserController@create']);
$router->post('api/login', ['uses' => 'UserController@login']);
$router->group(['middleware' => 'auth'], function() use ($router){
    $router->post('api/games/search', ['uses' => 'GamesController@search']);
});

$router->group(['prefix' => 'api', 'middleware'=>'auth'], function() use ($router){
    // GAMES
    $router->get('games', ['uses' => 'GamesController@index']);
    $router->get('gamescrud', ['uses' => 'GamesController@indexcrud']);
    $router->post('games', ['uses' => 'GamesController@create']);
    $router->delete('games/{id}', ['uses' => 'GamesController@destroy']);
    $router->post('games/{id}', ['uses' => 'GamesController@update']);
    $router->get('games/{id}', ['uses' => 'GamesController@show']);
    $router->put('games/{id}', ['uses' => 'GamesController@edit']);
    
    // user
    $router->get('userdev', ['uses' => 'UserController@getdeveloper']);
    $router->get('user', ['uses' => 'UserController@index']);
    $router->get('user/{id}', ['uses' => 'UserController@show']);
    $router->post('user/{id}', ['uses' => 'UserController@update']);
    $router->put('user/{id}', ['uses' => 'UserController@edit']);
    
    // comments
    $router->post('comment', ['uses' => 'CommentsController@create']);
    $router->get('comment/{id}', ['uses' => 'CommentsController@show']);
    
    
});

$router->group(['prefix' => 'api'], function() use ($router){
    $router->get('commentumum/{id}', ['uses' => 'CommentsController@show']);
    $router->get('commentumum', ['uses' => 'CommentsController@index']);
    $router->post('commentumum', ['uses' => 'CommentsController@create']);
    $router->get('gamesumum', ['uses' => 'GamesController@index']);
    $router->get('gamesumum/{id}', ['uses' => 'GamesController@show']);
});
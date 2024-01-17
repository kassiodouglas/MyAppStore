<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:api')->group(function(){

    Route::prefix("/auth")->group(function(){
        Route::post("/login", [AuthController::class,'login'])->withoutMiddleware('auth:api');
        Route::post("/user/register", [AuthController::class,'userRegister'])->withoutMiddleware('auth:api');
        Route::get('/refresh', [AuthController::class,'refresh'])->withoutMiddleware('auth:api');

        Route::get('/me', [AuthController::class,'me']);
        Route::get('/logout', [AuthController::class,'logout']);
    });

});

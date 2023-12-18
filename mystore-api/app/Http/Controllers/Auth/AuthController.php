<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    /** Resposta padrão para exibir o token ou refresh token */
    protected function respondWithToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    /** Realiza o login e retorna o token */
    public function login(Request $request){

        $credentials = $request->only(['login','password']);

        if(!$accesstoken = auth()->attempt($credentials)){
            abort(401, 'Unauthenticated');
        }

        if(auth()->user()->deleted_at !== null){
            abort(401, "User is disabled");
        }

        return $this->respondWithToken($accesstoken);
    }

    /** Retorna os dados do usuário autenticado */
    public function me(){
        return response()->json(auth()->user());
    }

    /** Realiza o logout */
    public function logout(){
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /** Atualiza o token */
    public function refresh(){
        return $this->respondWithToken(auth()->refresh());
    }
}

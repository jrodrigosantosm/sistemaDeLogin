<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use HasApiTokens, Notifiable;

class AuthController extends Controller
{
    /**
     * Registrar um novo usuário.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        // Validar os dados recebidos na requisição
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        try {
            // Criar um novo usuário com os dados fornecidos
            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
            ]);

            // Retornar uma resposta JSON indicando sucesso
            return response()->json(['message' => 'User registered successfully'], 201);
        } catch (\Exception $e) {
            // Em caso de falha na criação do usuário, retornar uma resposta com o erro
            return response()->json(['message' => 'Failed to register user', 'error' => $e->getMessage()], 500);
        }
    }


    /**
     * Fazer login no sistema.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     * 
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('authToken')->plainTextToken;

        session()->put('authToken', $token);

        return response()->json(['token' => $token], 200);
    }

    /**
     * Fazer logout do sistema.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}

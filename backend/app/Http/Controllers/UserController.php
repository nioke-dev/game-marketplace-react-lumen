<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function getdeveloper()
    {
        $dev = 'developer';
        $user = User::where('role', $dev)->get();
        return response()->json($user);
    }

    public function index()
    {
        $user = User::all();
        return response()->json($user);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $this->validate($request,[
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'avatar' => 'required',
            'role' => 'required',
        ]);

        $NamaAvatar = $request->file('avatar')->getClientOriginalName();
        $NamaFile = time() . '.' . $request->file('avatar')->getClientOriginalExtension();        
        $request->file('avatar')->move('upload', $NamaFile);
        
        if ($request->input('role') == 'developer') {
            $data = [
              'name' => $request->input('name'),
              'email' => $request->input('email'),
              'password' => $request->input('password'),
              'avatar' => url('upload/' . $NamaFile),
              'role' => $request->input('role'), 
              'api_token' => '12345',
              'status' => 0
            ];
        }else{
            $data = [
              'name' => $request->input('name'),
              'email' => $request->input('email'),
              'password' => $request->input('password'),
              'avatar' => url('upload/' . $NamaFile),
              'role' => $request->input('role'), 
              'api_token' => '12345',
              'status' => 1
            ];            
        }

        
        $user = User::create($data);

        if ($user) {
            return response()->json([
                'pesan' => 'berhasil registrasi',
                'data' => $user
            ]);
        }            
    }

    

    public function login(Request $request){
        $email = $request->input('email');
        $password = $request->input('password');
        
        $user = User::where('email', $email)->first();

        if (isset($user)) {
            if ($user->password === $password) {
                if ($user->status === 0) {
                    return response()->json([
                        'pesan' => 'login gagal publisher belum verifikasi data anda',
                        'data' => ''
                    ]);    
                }else{
                    $token = Str::random(30);
                    
                    $user->update([
                        'api_token' => $token
                    ]);
    
                    return response()->json([
                        'pesan' => 'login berhasil',
                        'token' => $token,
                        'data' => $user
                    ]);                
                }
            }else{
                return response()->json([
                    'pesan' => 'login gagal password salah',
                    'data' => ''
                ]);
            }
        }else{
            return response()->json([
                'pesan' => 'login gagal!',
                'data' => ''
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $user = User::where('id', $id)->get();
        return response()->json([
            'data' => $user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::where('id', $id)->get();
        if ($user[0]->status == 0) {
            $data = [
                'status' => 1
            ];
        }else{
            $data = [
                'status' => 0
            ];
        }

        $user = User::where('id', $id)->update($data);
        return response()->json([
            'data' => $user,
            'pesan' => 'berhasil'
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        if ($request->hasFile('avatar')) {        
            // $NamaGambar = $request->file('avatar')->getClientOriginalName();
            // $request->file('avatar')->move('upload', $NamaGambar);
            $NamaFile = time() . '.' . $request->file('avatar')->getClientOriginalExtension();        
            $request->file('avatar')->move('upload', $NamaFile);
            $data = [
                'name' => $request->input('name'),
                'email' => $request->input('email'),                
                'avatar' => url('upload/' . $NamaFile),                                                
            ];  
        } else {
            $data = [
                'name' => $request->input('name'),
                'email' => $request->input('email'),                                
            ];
        }                


        $user = User::where('id', $id)->update($data);

        if ($user) {        
            return response()->json([
                'pesan' =>  'data sudah diupdate',
                'data' => $user
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}

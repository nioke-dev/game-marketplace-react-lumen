<?php

namespace App\Http\Controllers;

use App\Models\Games;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GamesController extends Controller
{   

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request){
        $cari = $request->kata;
        $data = DB::table('games')        
        ->join('users', 'users.id', '=', 'games.developer_id')
        ->select('games.*', 'users.name')
        ->where('nama_games', 'like', "%" . $cari . "%")
        ->orwhere('description', 'like', "%" . $cari . "%")
        ->get();
        // $data = Games::where('nama_games', 'like', "%" . $cari . "%")
        // ->orwhere('description', 'like', "%" . $cari . "%")
        // ->get();
        return response()->json([
            'data' => $data
        ]);
    }

    public function indexcrud(){

        $data = DB::table('games')        
        ->join('users', 'users.id', '=', 'games.developer_id')
        ->select('games.*', 'users.name')        
        ->get();
        
        return response()->json($data);
    }

    public function index()
    {
        //
        $data = DB::table('games')        
        ->join('users', 'users.id', '=', 'games.developer_id')
        ->select('games.*', 'users.name')
        ->where('games.status', '1')
        ->get();
        
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {        
        $this->validate($request, [
            'developer_id' => 'required|numeric',
            'nama_games' => 'required',
            'description' => 'required',
            'homepage' => 'required',
            'status' => 'required',
            'gambar' => 'required'
        ]);
        
        $NamaGambar = $request->file('gambar')->getClientOriginalName();
        $request->file('gambar')->move('upload', $NamaGambar);

        $data = [
            'developer_id' => $request->input('developer_id'),
            'nama_games' => $request->input('nama_games'),
            'description' => $request->input('description'),
            'homepage' => $request->input('homepage'),
            'status' => $request->input('status'),
            'gambar' => url('upload/'.$NamaGambar),
        ];                

        $games = Games::create($data);
        
        if ($games) {
            return response()->json([
                'pesan' => "data sudah disimpan",
                'data' => $games
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
     * @param  \App\Models\Games  $games
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {        
        $data = DB::table('games')        
        ->join('users', 'users.id', '=', 'games.developer_id')        
        ->select('games.*', 'users.name', 'users.avatar')
        ->where('games.id', $id)
        ->get();
        
        return response()->json($data);    
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Games  $games
     * @return \Illuminate\Http\Response
     */

    public function edit($id)
    {
        // 
        $games = Games::where('id', $id)->get();
        if ($games[0]->status == 0) {
            $data = [
                'status' => 1
            ];
        }else{
            $data = [
                'status' => 0
            ];
        }

        $games = Games::where('id', $id)->update($data);
        return response()->json([
            'data' => $games,
            'pesan' => 'berhasil'
        ]);               
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Games  $games
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if ($request->hasFile('gambar')) {                    
            $NamaFile = time() . '.' . $request->file('gambar')->getClientOriginalExtension();        
            $request->file('gambar')->move('upload', $NamaFile);
            $data = [
                'developer_id' => $request->input('developer_id'),
                'nama_games' => $request->input('nama_games'),
                'description' => $request->input('description'),
                'homepage' => $request->input('homepage'),                
                'status' => $request->input('status'),                
                'gambar' => url('upload/' . $NamaFile),                                                
            ];  
        } else {
            $data = [
                'developer_id' => $request->input('developer_id'),
                'nama_games' => $request->input('nama_games'),
                'description' => $request->input('description'),
                'homepage' => $request->input('homepage'),                
                'status' => $request->input('status'),                                      
            ];
        }                


        $games = Games::where('id', $id)->update($data);

        if ($games) {        
            return response()->json([
                'pesan' =>  'data sudah diupdate',
                'data' => $games
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Games  $games
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $games = Games::where('id', $id)->delete();
        
        if($games){
            return response()->json([
                'pesan' => 'data berhasil dihapus',
                'data' => $games
            ]);
        }
    }
}

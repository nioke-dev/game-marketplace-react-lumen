<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $data = DB::table('comments')        
        ->join('users', 'users.id', '=', 'comments.user_id')        
        ->join('games', 'games.id', '=', 'comments.game_id')        
        ->select('games.*', 'users.*', 'comments.*')        
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
        $data = [
            'user_id' => $request->input('user_id'),
            'game_id' => $request->input('game_id'),
            'message' => $request->input('message'),
            'rate' => $request->input('rate'),                        
        ];                

        $comments = Comments::create($data);
        
        if ($comments) {
            return response()->json([
                'pesan' => "data sudah disimpan",
                'data' => $comments
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
     * @param  \App\Models\Comments  $comments
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $data = DB::table('comments')        
        ->join('users', 'users.id', '=', 'comments.user_id')        
        ->join('games', 'games.id', '=', 'comments.game_id')        
        ->select('games.*', 'users.*', 'comments.*')        
        ->where('game_id', $id)
        ->get();
        return response()->json($data);  
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Comments  $comments
     * @return \Illuminate\Http\Response
     */
    public function edit(Comments $comments)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Comments  $comments
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Comments $comments)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Comments  $comments
     * @return \Illuminate\Http\Response
     */
    public function destroy(Comments $comments)
    {
        //
    }
}

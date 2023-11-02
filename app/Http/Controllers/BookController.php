<?php

namespace App\Http\Controllers;

use App\Http\Requests\SearchBookRequest;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index(SearchBookRequest $request)
    {
        $page = $request->get('page');
        $search = $request->get('search');

        $books = Book::where('title', 'like', "%{$search}%")
            ->orWhere('author', 'like', "%{$search}%")
            ->paginate(10, ['*'], 'page', $page);

        $books->load('category');

        return response()->json($books);
    }


    public function store(StoreBookRequest $request)
    {
        $book = Book::create($request->all());

        if ($request->has('category_id')) {
            $category = Category::find($request->input('category_id'));

            if ($category) {
                $book->category()->associate($category);
                $book->save();
            }
        }

        $book->load('category');

        return response()->json($book, 201);
    }

    public function show(Book $book)
    {
        $book->load('category');
        return response()->json($book);
    }

    public function update(UpdateBookRequest $request, Book $book)
    {
        $book->update($request->all());

        if ($request->has('category_id')) {
            $category = Category::find($request->input('category_id'));

            if ($category) {
                $book->category()->associate($category);
            } else {
                $book->category()->dissociate();
            }
        } else {
            $book->category()->dissociate();
        }

        $book->save();

        $book->load('category');

        return response()->json($book);
    }

    public function destroy(Book $book)
    {
        $book->delete();

        return response()->json(null, 204);
    }
}

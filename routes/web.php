<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfessionQuestionsController;
use App\Http\Controllers\QuestionDetailsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/profession/{professionId}/questions', [ProfessionQuestionsController::class, 'index'])->name('profession.questions');

Route::get('/question/{questionId}', [QuestionDetailsController::class, 'index'])->name('question');

Route::post('/question/{questionId}/reaction', [ProfessionQuestionsController::class, 'reactionQuestion'])->name('question.reaction');

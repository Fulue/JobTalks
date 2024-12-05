<?php

namespace App\Http\Controllers;

use App\DTO\ProfessionDTO;
use App\Models\Profession;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('home', [
            'professions' => ProfessionDTO::collect(Profession::all())->toArray(),
        ]);
    }
}

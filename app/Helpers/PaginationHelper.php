<?php

namespace App\Helpers;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PaginationHelper
{
    public static function paginate(Builder|HasMany $query, int $perPage, int $currentPage = 1): array
    {
        $offset = ($currentPage - 1) * $perPage;
        $total = $query->count();
        $items = $query->offset($offset)->limit($perPage)->get();
        $lastPage = (int) ceil($total / $perPage);

        return [
            'items' => $items,
            'total' => $total,
            'lastPage' => $lastPage,
        ];
    }
}

<?php

namespace App\Filament\Resources\TimestampResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class TimestampsTagRelationManager extends RelationManager
{
    protected static string $relationship = 'timestamps';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('id')
                    ->required()
                    ->maxLength(255),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->defaultSort('created_at')
            ->recordTitleAttribute('id')
            ->columns([
                Tables\Columns\TextColumn::make('question_text'),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                Tables\Actions\AttachAction::make()
                    ->recordTitleAttribute('question_text')
                    ->recordSelectSearchColumns(['question_text'])
                    ->preloadRecordSelect(),
            ])
            ->actions([
                Tables\Actions\DetachAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DetachBulkAction::make(),
                ]),
            ]);
    }
}

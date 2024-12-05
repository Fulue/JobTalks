<?php

namespace App\Filament\Resources\TimestampResource\RelationManagers;

use App\Models\Timestamp;
use App\Models\User;
use App\Models\Video;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Collection;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;

class TimestampsQuestionRelationManager extends RelationManager
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
                Tables\Columns\TextColumn::make('pivot.similarity')
                    ->label('Similarity'),
                Tables\Columns\TextColumn::make('question_text'),
                Tables\Columns\TextColumn::make('start_time'),
            ])
            ->defaultSort('similarity', 'desc')
            ->filters([
                //
            ])
            ->headerActions([
                Tables\Actions\Action::make('add')
                    ->form([
                        Forms\Components\Select::make('timestamp_id')
                            ->options(Timestamp::all()->pluck('question_text', 'id'))
                            ->searchable()
                            ->native(false)
                            ->required(),
                        Forms\Components\TextInput::make('similarity')
                            ->numeric()
                            ->step(0.5)
                            ->suffix('%')
                            ->required(),
                    ])
                    ->action(function (array $data, ): void {

                    })
                    ->color('info')
                    ->label('Add Timestamps'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}

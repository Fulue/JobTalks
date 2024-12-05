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

class TimestampsRelationManager extends RelationManager
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
                Tables\Columns\TextColumn::make('start_time'),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                Tables\Actions\Action::make('import')
                    ->form([
                        Textarea::make('json')
                            ->rows(10)
                            ->cols(20)
                    ])
                    ->action(function (array $data, ): void {
                        $json = collect(json_decode($data['json'],true));
                        $json->each(function($record) {
                            $timecode = $record['timecode'];
                            $question = $record['question'];
                            $video = static::getOwnerRecord();
                            Timestamp::create([
                                'start_time' => $timecode,
                                'question_text' => $question,
                                'video_id' => $video->id,
                            ]);
                        });
                    })
                    ->color('info')
                    ->label('Import Json'),
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}

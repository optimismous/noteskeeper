/*
    Хранилище заметок. Структура:
    {
        "notes": {
          "metadata": {
            "_lastId": Number
          },
          "_0": {
            "title": String,
            "text": String,
            "createdOn": String,
            "tags": Array
          },
          ...
          "_x": Object
        }
    }

 */

'use strict';

angular.module('notesKeeper')

    .factory('notesStorage', function () {
        var notesStorage;
        var domStorage = localStorage;
        var notesKey = 'notes';
        var notes;

        try {
            // todo: validation
            notes = JSON.parse(domStorage[notesKey]);
        } catch (e) {
            notes = null;
        }

        if (!notes) {
            notes = {
                metadata: {
                    lastId: 0
                },
                notesList: {}
            };
        }

        notesStorage =  {
            _notes: notes,
            getNotesAmount: function () {
                return Object.keys(this._notes.notesList).length;
            },
            putNote: function (note) {
                // Todo: validation
                var id = this._generateId();
                this._notes.notesList['_' + id] = note || {};
                this._notes.notesList['_' + id].id = id;
                this._notes.notesList['_' + id].createdOn = Date.now();
                domStorage[notesKey] = JSON.stringify(notesStorage._notes);
                return true;
            },
            updateNote: function (id, note) {
                var editedNote = this._notes.notesList['_' + id];

                if (editedNote) {
                    this._notes.notesList['_' + id].text = note.text;
                    this._notes.notesList['_' + id].title = note.title;
                    domStorage[notesKey] = JSON.stringify(notesStorage._notes);
                } else {
                    this.putNote(note);
                }
            },
            getNotes: function () {
                return this._notes.notesList;
            },
            clear: function (notesKey) {
                domStorage.removeItem(notesKey);
            },
            getNote: function (id) {
                return notes.notesList['_' + id];
            },
            removeNote: function (id) {
                delete this._notes.notesList['_' + id];
                domStorage[notesKey] = JSON.stringify(notesStorage.notes);
            },
            isNotesEmpty: function () {
                return angular.equals({}, this._notes.notesList);
            },
            _generateId: function () {
                var nextId = (this._notes.metadata.lastId || 0) + 1;
                return this._notes.metadata.lastId = nextId;
            }
        };

        return notesStorage;

    });
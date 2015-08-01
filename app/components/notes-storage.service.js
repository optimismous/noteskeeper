'use strict';

angular.module('notesKeeper')

    .factory('notesStorage', function () {
        var notesStorage;
        var domStorage = localStorage;
        var notesKey = 'notes';
        var notes;

        try {
            notes = JSON.parse(domStorage[notesKey]);
        } catch (e) {
            notes = {};
        }

        notesStorage =  {
            notes: notes,
            getNotesAmount: function () {
                return Object.keys(notesStorage.notes).length;
            },
            putNote: function (key, note) {
                if (key && note instanceof Object) {
                    notesStorage.notes[key] = note;
                    domStorage[notesKey] = JSON.stringify(notesStorage.notes);
                    return true;
                }

                return false;
            },
            getNotes: function () {
                return notesStorage.notes;
            },
            clear: function (notesKey) {
                domStorage.removeItem(notesKey);
            },
            removeNote: function (createdOn) {
                var key = notesStorage.getKeyFromStamp(createdOn);

                delete notesStorage.notes[key];

                domStorage[notesKey] = JSON.stringify(notesStorage.notes);
            },
            getKeyFromStamp: function (tStamp) {
                return '_' + tStamp.toString(16);
            },
            isNotesEmpty: function () {
                return angular.equals({}, notesStorage.notes);
            }
        };

        return notesStorage;

    });